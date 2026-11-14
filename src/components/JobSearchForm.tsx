import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Check, User} from '@phosphor-icons/react';
import {Input} from './ui/Input';
import {Button} from './ui/Button';
import {Select} from './ui/Select';
import {SuccessPopup} from './ui/SuccessPopup';
import {ErrorPopup} from './ui/ErrorPopup';
import {LocationInput} from './ui/LocationInput';
import {useJobSearch} from '../hooks/useJobSearch';
import {Footer} from './Footer';
import {LogosVersion} from './howitworks/LogosVersion';
import {WhyUsManifesto} from './WhyUsVariants';

export const JobSearchForm: React.FC = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    error,
    showSuccessPopup,
    setShowSuccessPopup,
    showErrorPopup,
    setShowErrorPopup,
    suggestions,
    showSuggestions,
    suggestionsRef,
    userId,
    navigate,
    handleLocationInput,
    handleSuggestionClick,
    handleSubmit,
    handleInputChange,
    handleBlur,
      touched,
      addSkill,
      removeSkill,
      addEducation,
      removeEducation,
      handleSkillKeyDown,
      handleEducationKeyDown,
      addExperience,
      removeExperience,
      handleExperienceKeyDown,
      acceptedTerms,
      termsError,
      handleTermsChange
  } = useJobSearch();

    // Local UI only state for progressive disclosure of quick-add chips
    const [showSkillExamples, setShowSkillExamples] = useState(false);
    const [showEducationExamples, setShowEducationExamples] = useState(false);
    const [showExperienceExamples, setShowExperienceExamples] = useState(false);
    // Optional enrichments deferred behind a single toggle (progressive disclosure).
    const [showBoost, setShowBoost] = useState(false);

    const stackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const wrapper = stackRef.current;
        if (!wrapper) return;
        const cards = Array.from(wrapper.querySelectorAll('.stack-card')) as HTMLElement[];
        if (!cards.length) return;

        const mql = window.matchMedia('(max-width: 767px)');

        // Mobile: skip the sticky deck (cards are taller than the viewport and
        // stack badly). Reveal each card with a fade + slide as it scrolls in.
        const setupMobile = () => {
            wrapper.classList.add('reveal-ready');
            // Reveal once, then leave it alone — re-hiding on scroll-up left
            // cards taller than the viewport sitting blurred while you read them.
            // -35% puts the trigger at 65% of the screen: the card is a third of
            // the way in when it animates, so the fade is actually watched rather
            // than finishing off the bottom edge.
            const reveal = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    e.target.classList.add('revealed');
                    reveal.unobserve(e.target);
                });
            }, {threshold: 0, rootMargin: '0px 0px -35% 0px'});
            cards.forEach(c => reveal.observe(c));
            return () => {
                reveal.disconnect();
                wrapper.classList.remove('reveal-ready');
                cards.forEach(c => c.classList.remove('revealed'));
            };
        };

        // Desktop: sticky deck. Dynamic height so the last card releases before
        // the footer without a huge spacer.
        const setupDesktop = () => {
            const computeHeight = () => {
                const vh = window.innerHeight;
                const totalCardsHeight = cards.reduce((sum, c) => sum + c.offsetHeight, 0);
                const firstHeight = cards[0].offsetHeight;
                const target = firstHeight + (totalCardsHeight - firstHeight) + (vh - firstHeight * 0.6);
                wrapper.style.setProperty('--stack-height', `${target}px`);
            };
            computeHeight();
            const ro = new ResizeObserver(computeHeight);
            cards.forEach(c => ro.observe(c));
            window.addEventListener('resize', computeHeight);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) el.classList.add('is-active'); else el.classList.remove('is-active');
                });
            }, {threshold: 0.55, rootMargin: '0px 0px -10% 0px'});
            cards.forEach(c => observer.observe(c));

            return () => {
                observer.disconnect();
                ro.disconnect();
                window.removeEventListener('resize', computeHeight);
                wrapper.style.removeProperty('--stack-height');
                cards.forEach(c => c.classList.remove('is-active'));
            };
        };

        // Wire up the matching mode, and re-wire when crossing the breakpoint
        // (resize / DevTools device toggle) so it works without a reload.
        let teardown = mql.matches ? setupMobile() : setupDesktop();
        const onChange = () => {
            teardown();
            teardown = mql.matches ? setupMobile() : setupDesktop();
        };
        mql.addEventListener('change', onChange);

        return () => {
            mql.removeEventListener('change', onChange);
            teardown();
        };
    }, []);

  return (
      <main id="main-content" className="min-h-screen flex flex-col soft-ui">
        {/* Success Popup */}
        <SuccessPopup
            show={showSuccessPopup}
            onClose={() => setShowSuccessPopup(false)}
            dashboardUrl={userId ? `/dashboard/${userId}` : undefined}
        />
        {/* Error Popup */}
        <ErrorPopup
            show={showErrorPopup}
            onClose={() => setShowErrorPopup(false)}
            error={error}
            onContactSupport={() => navigate('/contact')}
        />
          {/* Hero Section — owns the first screen */}
          <section className="relative border-b border-[color:var(--clr-border)] dot-grid-bg overflow-hidden min-h-[100svh] flex flex-col justify-center">
              <div className="dot-cluster"/>
              <Link to="/login" className="signin-chip z-10">
                  <User size={14} weight="bold"/> Sign in
              </Link>
              <div className="wrap relative py-16 md:py-24">
                  <div className="hero-grid">
                      <div className="max-w-4xl animate-fade-in-up">
                          <h1 className="heading-xl heading-gradient">Job Search on Autopilot</h1>
                          <p className="mt-6 md:mt-10 subcopy max-w-2xl">Tell us what you want: skills, role, location.
                              We
                              only send
                              one email when a job actually fits. No spam.</p>
                          <div className="mt-8 md:mt-12 flex flex-wrap gap-4">
                              <button onClick={() => {
                                  const el = document.getElementById('subscription-form');
                                  if (el) el.scrollIntoView({behavior: 'smooth'});
                              }} className="minimal-btn">
                                  <span className="text-xs">↗</span> Get matches
                              </button>
                              <a href="#how" className="link-quiet">
                                  <span>How it works</span>
                                  <span className="arrow">↗</span>
                              </a>
                          </div>
                      </div>
                      {/* Signature visual: the noise funnel — N listings scanned, one match survives. */}
                      <div className="funnel reveal-row" aria-hidden="true">
                          <div className="funnel-cap">
                              <span><span className="big">247</span> listings scanned today</span>
                              <span>→ 1 match</span>
                          </div>
                          <div className="fun-stack">
                              <div className="fun-row redact [--o:.42] [animation-delay:50ms]">
                                  <span className="dot"/>
                                  <span className="bar w-[62%]"/>
                              </div>
                              <div className="fun-row [--o:.55] [animation-delay:100ms]">
                                  <span className="dot"/>
                                  <span className="bar w-[48%]"/>
                                  <span className="bar b2 w-[22%]"/>
                              </div>
                              <div className="fun-row redact [--o:.4] [animation-delay:150ms]">
                                  <span className="dot"/>
                                  <span className="bar w-[70%]"/>
                              </div>
                              <div className="fun-arrow">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                       strokeWidth="2.5">
                                      <path d="M12 5v14M5 12l7 7 7-7"/>
                                  </svg>
                              </div>
                              <div className="fun-match">
                                  <div className="fun-mtop">
                                      <span className="fun-role">Project Manager</span>
                                      <span className="fun-score">96% fit</span>
                                  </div>
                                  <div className="fun-meta">Remote (EU) · €60–70k</div>
                                  <div className="fun-tags">
                                      <span>Agile </span><span>1+ years of experience</span>
                                  </div>
                              </div>
                              <div className="fun-row [--o:.55] [animation-delay:250ms]">
                                  <span className="dot"/>
                                  <span className="bar w-[54%]"/>
                                  <span className="bar b2 w-[30%]"/>
                              </div>
                              <div className="fun-row redact [--o:.4] [animation-delay:300ms]">
                                  <span className="dot"/>
                                  <span className="bar w-[66%]"/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* Trust before the ask: how it works + privacy */}
          <section id="how" className="relative stack-wide mx-auto px-6 pt-8 md:pt-16 pb-6 space-y-10">
              <div ref={stackRef} className="stack-wrapper">
                  <div className="stack-spacer">
                      <article className="stack-card hiw-full-card" style={{'--i': 1} as React.CSSProperties}>
                          <LogosVersion/>
                      </article>
                      <article className="stack-card" style={{'--i': 2} as React.CSSProperties}>
                          <WhyUsManifesto/>
                      </article>
                  </div>
              </div>
          </section>
          {/* Form Section */}
          <div id="subscription-form" className="relative w-full pt-12 md:pt-20 pb-20">
              <div className="wrap">
                  <div className="panel p-6 sm:p-10 md:p-14">
                      <form onSubmit={handleSubmit} className="form-grid">
                          {/* Role */}
                          <div className="md:col-span-1">
                              <Input label="Role" variant="minimal" type="text" value={formData.position}
                                     onChange={handleInputChange('position')} onBlur={handleBlur('position')}
                                     placeholder="Frontend Developer" required
                                     error={touched.position ? formErrors.position : undefined}/>
                          </div>
                          {/* Job Type */}
                          <div className="md:col-span-1">
                              <Select label="Job Type" variant="minimal" value={formData.jobType}
                                      onChange={handleInputChange('jobType')} onBlur={handleBlur('jobType')} required
                                      error={touched.jobType ? formErrors.jobType : undefined}
                                      options={[{value: '', label: 'Select job type'}, {
                                          value: 'full-time',
                                          label: 'Full Time'
                                      }, {value: 'part-time', label: 'Part Time'}, {
                                          value: 'working-student',
                                          label: 'Working Student'
                                      }, {value: 'internship', label: 'Internship'}]}/>
                          </div>
                          {/* Location */}
                          <div className="md:col-span-1">
                              <LocationInput variant="minimal" value={formData.location} onChange={handleLocationInput}
                                             onBlur={handleBlur('location')} suggestions={suggestions}
                                             showSuggestions={showSuggestions} suggestionsRef={suggestionsRef}
                                             onSuggestionClick={handleSuggestionClick}
                                             error={touched.location ? formErrors.location : undefined}/>
                          </div>
                          {/* Email */}
                          <div className="md:col-span-1">
                              <Input label="Email" variant="minimal" type="email" value={formData.email}
                                     onChange={handleInputChange('email')} onBlur={handleBlur('email')}
                                     placeholder="you@domain.com" required
                                     error={touched.email ? formErrors.email : undefined}/>
                          </div>
                          {/* Optional enrichments deferred behind a toggle (progressive disclosure) */}
                          <div className="md:col-span-2">
                              <button type="button" onClick={() => setShowBoost(s => !s)}
                                      aria-expanded={showBoost}
                                      aria-controls="boost-fields"
                                      className="boost-toggle">
                                  <span>Boost match quality (optional)</span>
                                  <span className="boost-toggle-sign" aria-hidden="true">{showBoost ? '−' : '+'}</span>
                              </button>
                          </div>
                          {showBoost && (
                              <>
                          {/* Skills Token Field */}
                                  <div id="boost-fields" className="md:col-span-2 space-y-3">
                              <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3 flex-wrap">
                                      <label className="tag-meta font-semibold" htmlFor="skills-input">What are your key
                                          skills? (up to 10)</label>
                                      {formErrors.skills &&
                                          <span className="text-xs text-[color:var(--clr-danger)] ml-auto">{formErrors.skills}</span>}
                                  </div>
                                  <p className="micro-hint" id="skills-hint">Add core technologies & tools (e.g. React,
                                      TypeScript, PostgreSQL). Avoid soft skills.</p>
                              </div>
                              <div className={"token-field " + (touched.skills ? '' : '')}
                                   aria-describedby="skills-hint">
                                  {formData.skills.map(skill => (
                                      <span key={skill} className="tag-badge">
                        {skill}
                                          <button type="button" aria-label={`Remove ${skill}`}
                                                  onClick={() => removeSkill(skill)}>&times;</button>
                      </span>
                                  ))}
                                  {formData.skills.length < 10 && (
                                      <input
                                          id="skills-input"
                                          type="text"
                                          aria-label="Add skill"
                                          placeholder={formData.skills.length === 0 ? 'Type a skill & hit Enter' : 'Add another skill'}
                                          onKeyDown={handleSkillKeyDown}
                                          onFocus={() => setShowSkillExamples(true)}
                                          className="tag-input"
                                      />
                                  )}
                              </div>
                              {showSkillExamples && (
                                  <div className="example-chips" role="list" aria-label="Quick add skills">
                                      {['Project Management', 'Quality Assurance', 'CE Marking', 'Python', 'Risk Assessment', 'Regulatory Compliance'].map(ex => {
                                          const added = formData.skills.some(s => s.toLowerCase() === ex.toLowerCase());
                                          return (
                                              <button
                                                  type="button"
                                                  key={ex}
                                                  onClick={() => addSkill(ex)}
                                                  disabled={added}
                                                  className="example-chip"
                                                  aria-pressed={added}
                                                  role="listitem"
                                              >{ex}</button>
                                          );
                                      })}
                                  </div>
                              )}
                          </div>
                          {/* Education Token Field */}
                          <div className="md:col-span-2 space-y-3">
                              <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3 flex-wrap">
                                      <label className="tag-meta font-semibold" htmlFor="education-input">What education
                                          do you have? (max 3)</label>
                                      {formErrors.education && <span
                                          className="text-xs text-[color:var(--clr-danger)] ml-auto">{formErrors.education}</span>}
                                  </div>
                                  <p className="micro-hint" id="education-hint">Add your highest degree or relevant
                                      certifications (e.g. BSc Computer Science, AWS Certified). Keep it concise.</p>
                              </div>
                              <div className="token-field" aria-describedby="education-hint">
                                  {formData.education.map(entry => (
                                      <span key={entry} className="tag-badge">
                        {entry}
                                          <button type="button" aria-label={`Remove ${entry}`}
                                                  onClick={() => removeEducation(entry)}>&times;</button>
                      </span>
                                  ))}
                                  {formData.education.length < 3 && (
                                      <input
                                          id="education-input"
                                          type="text"
                                          aria-label="Add education"
                                          placeholder={formData.education.length === 0 ? 'Type & hit Enter' : 'Add another'}
                                          onKeyDown={handleEducationKeyDown}
                                          onFocus={() => setShowEducationExamples(true)}
                                          className="tag-input"
                                      />
                                  )}
                              </div>
                              {showEducationExamples && (
                                  <div className="example-chips" role="list" aria-label="Quick add education">
                                      {['BSc Computer Science', 'MSc Microbiology', 'IHK Certificate', 'SCP Certificate'].map(ex => {
                                          const added = formData.education.some(s => s.toLowerCase() === ex.toLowerCase());
                                          return (
                                              <button
                                                  type="button"
                                                  key={ex}
                                                  onClick={() => addEducation(ex)}
                                                  disabled={added}
                                                  className="example-chip"
                                                  aria-pressed={added}
                                                  role="listitem"
                                              >{ex}</button>
                                          );
                                      })}
                                  </div>
                              )}
                          </div>
                          {/* Experience Token Field */}
                          <div className="md:col-span-2 space-y-3">
                              <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3 flex-wrap">
                                      <label className="tag-meta font-semibold" htmlFor="experience-input">What work
                                          experience do you have? (max 3)</label>
                                      {formErrors.experience && <span
                                          className="text-xs text-[color:var(--clr-danger)] ml-auto">{formErrors.experience}</span>}
                                  </div>
                                  <p className="micro-hint" id="experience-hint">Add your key previous roles or years of
                                      experience (e.g. "3 years as Backend Developer", "Senior Product Manager"). Keep
                                      it concise.</p>
                              </div>
                              <div className="token-field" aria-describedby="experience-hint">
                                  {formData.experience.map(entry => (
                                      <span key={entry} className="tag-badge">
                        {entry}
                                          <button type="button" aria-label={`Remove ${entry}`}
                                                  onClick={() => removeExperience(entry)}>&times;</button>
                      </span>
                                  ))}
                                  {formData.experience.length < 3 && (
                                      <input
                                          id="experience-input"
                                          type="text"
                                          aria-label="Add experience"
                                          placeholder={formData.experience.length === 0 ? 'Type & hit Enter' : 'Add another'}
                                          onKeyDown={handleExperienceKeyDown}
                                          onFocus={() => setShowExperienceExamples(true)}
                                          className="tag-input"
                                      />
                                  )}
                              </div>
                              {showExperienceExamples && (
                                  <div className="example-chips" role="list" aria-label="Quick add experience">
                                      {['2 years as Frontend Developer', '5+ years Backend Engineer', 'Trainee as Product Manager', 'internship Data Analyst'].map(ex => {
                                          const added = formData.experience.some(s => s.toLowerCase() === ex.toLowerCase());
                                          return (
                                              <button
                                                  type="button"
                                                  key={ex}
                                                  onClick={() => addExperience(ex)}
                                                  disabled={added}
                                                  className="example-chip"
                                                  aria-pressed={added}
                                                  role="listitem"
                                              >{ex}</button>
                                          );
                                      })}
                                  </div>
                              )}
                          </div>
                              </>
                          )}
                          {/* Terms acceptance */}
                          <div className="md:col-span-2">
                              <label className="flex items-start gap-3 cursor-pointer select-none">
                                  <span className="relative inline-flex mt-0.5 shrink-0">
                                      <input
                                          type="checkbox"
                                          checked={acceptedTerms}
                                          onChange={e => handleTermsChange(e.target.checked)}
                                          aria-invalid={!!termsError}
                                          aria-describedby="terms-error"
                                          className="peer h-6 w-6 appearance-none border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)] checked:bg-[color:var(--clr-amber)] cursor-pointer focus:outline-none focus-visible:shadow-[3px_3px_0_var(--clr-amber)]"
                                      />
                                      <Check
                                          className="pointer-events-none absolute inset-0 m-auto h-4 w-4 text-[color:var(--clr-base)] opacity-0 peer-checked:opacity-100"
                                          weight="bold"/>
                                  </span>
                                  <span className="text-sm text-[color:var(--clr-sub)] leading-snug">
                                      I have read and agree to the{' '}
                                      <Link to="/terms"
                                            className="font-medium text-[color:var(--clr-text)] underline decoration-dotted underline-offset-2">Terms of Use</Link>
                                      {' '}and the{' '}
                                      <Link to="/privacy"
                                            className="font-medium text-[color:var(--clr-text)] underline decoration-dotted underline-offset-2">Privacy Policy</Link>.
                                  </span>
                              </label>
                              {termsError &&
                                  <p id="terms-error" className="text-xs text-[color:var(--clr-danger)] mt-1.5">{termsError}</p>}
                          </div>
                          {/* Submit */}
                          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-6 pt-4">
                              <Button type="submit" isLoading={isSubmitting}
                                      className="jsf-submit-btn">
                                  Start monitoring
                              </Button>
                              <p className="text-xs text-[color:var(--clr-sub)]">One email per day at most, only when a match
                                  exists.</p>
                          </div>
                          {/* Submit state for screen readers: sending / sent / errors */}
                          <p role="status" aria-live="polite"
                             className="sr-only">
                              {isSubmitting ? 'Sending your subscription…' : error ? `Subscription failed: ${error}` : showSuccessPopup ? 'Subscription confirmed.' : ''}
                          </p>
              </form>
                  </div>
              </div>
          </div>
          <Footer/>
      </main>
  );
};
