import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Check} from 'lucide-react';
import {Input} from './ui/Input';
import {Button} from './ui/Button';
import {Select} from './ui/Select';
import {SuccessPopup} from './ui/SuccessPopup';
import {ErrorPopup} from './ui/ErrorPopup';
import {LocationInput} from './ui/LocationInput';
import {useJobSearch} from '../hooks/useJobSearch';
import {Footer} from './Footer';
import {MatchingFlow} from './AiMatching';
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
            // ponytail: re-observe cards (reversible) instead of unobserve-once,
            // so scrolling back up re-hides and re-animates on next entry.
            const reveal = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    e.target.classList.toggle('revealed', e.isIntersecting);
                });
            }, {threshold: 0, rootMargin: '-50% 0px -8% 0px'});
            // Let the hidden (opacity:0) state paint before observing, otherwise
            // the initial callback flips to revealed in the same frame and the
            // transition never runs.
            const raf = requestAnimationFrame(() =>
                requestAnimationFrame(() => cards.forEach(c => reveal.observe(c)))
            );
            return () => {
                cancelAnimationFrame(raf);
                reveal.disconnect();
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
      <main className="min-h-screen flex flex-col soft-ui">
        {/* Success Popup */}
        <SuccessPopup
            show={showSuccessPopup}
            onClose={() => setShowSuccessPopup(false)}
        />
        {/* Error Popup */}
        <ErrorPopup
            show={showErrorPopup}
            onClose={() => setShowErrorPopup(false)}
            error={error}
            onContactSupport={() => navigate('/contact')}
        />
          {/* Hero Section */}
          <section className="relative border-b border-gray-300/60 dot-grid-bg overflow-hidden">
              <div className="dot-cluster"/>
              <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-28 md:pt-24 md:pb-40">
                  <div className="max-w-4xl animate-fade-in-up">
                      <h1 className="heading-xl text-gray-900">Job Search on Autopilot</h1>
                      <p className="mt-6 md:mt-10 subcopy max-w-2xl">Tell us what you want: skills, role, location. We
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
          </div>
          </section>
          {/* Form Section */}
          <div className="relative w-full -mt-16 md:-mt-28 pb-20" id="subscription-form">
              <div className="max-w-6xl mx-auto px-6">
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
                          {/* Skills Token Field */}
                          <div className="md:col-span-2 space-y-3">
                              <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3 flex-wrap">
                                      <label className="tag-meta font-semibold" htmlFor="skills-input">What are your key
                                          skills? (up to 10)</label>
                                      {formErrors.skills &&
                                          <span className="text-[11px] text-red-500 ml-auto">{formErrors.skills}</span>}
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
                                          className="text-[11px] text-red-500 ml-auto">{formErrors.education}</span>}
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
                                          className="text-[11px] text-red-500 ml-auto">{formErrors.experience}</span>}
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
                                          className="peer h-5 w-5 appearance-none border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)] checked:bg-[color:var(--clr-amber)] cursor-pointer focus:outline-none focus-visible:shadow-[3px_3px_0_var(--clr-amber)]"
                                      />
                                      <Check
                                          className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-[color:var(--clr-base)] opacity-0 peer-checked:opacity-100"
                                          strokeWidth={3}/>
                                  </span>
                                  <span className="text-sm text-gray-600 leading-snug">
                                      I have read and agree to the{' '}
                                      <Link to="/terms"
                                            className="font-medium text-gray-900 underline decoration-dotted underline-offset-2">Terms of Use</Link>
                                      {' '}and the{' '}
                                      <Link to="/privacy"
                                            className="font-medium text-gray-900 underline decoration-dotted underline-offset-2">Privacy Policy</Link>.
                                  </span>
                              </label>
                              {termsError &&
                                  <p id="terms-error" className="text-[11px] text-red-500 mt-1.5">{termsError}</p>}
                          </div>
                          {/* Submit */}
                          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-6 pt-4">
                              <Button type="submit" isLoading={isSubmitting}
                                      className="jsf-submit-btn">
                                  Start monitoring
                              </Button>
                              <p className="text-xs text-gray-500">One email per day at most, only when a match
                                  exists.</p>
                          </div>
              </form>
                  </div>
                  <div id="how" className="mt-16 md:mt-28 space-y-12">
                      {/* Scroll stack cards */}
                      <div ref={stackRef} className="stack-wrapper">
                          <div className="stack-spacer">
                              <article className="stack-card" style={{'--i': 1} as React.CSSProperties}>
                                  <h2>How it works</h2>
                                  <div className="stack-line"/>
                                  <MatchingFlow/>
                              </article>
                              <article className="stack-card" style={{'--i': 2} as React.CSSProperties}>
                                  <WhyUsManifesto/>
                              </article>
                          </div>
                      </div>
                      {/* Slim CTA divider section */}
                      <div className="stack-cta" aria-label="Call to action">
                          <div className="stack-cta-inner">
                              <div className="stack-cta-left">
                                  <h2 className="stack-cta-title">Opportunities matched to your profile.</h2>
                                  <p className="stack-cta-sub">We monitor multiple sources and notify you only when
                                      positions aligned with your skills and preferences are posted. Adjust or
                                      unsubscribe
                                      any time.</p>
                              </div>
                              <div className="stack-cta-right">
                                  <button onClick={() => {
                                      const el = document.getElementById('subscription-form');
                                      if (el) el.scrollIntoView({behavior: 'smooth'});
                                  }} className="stack-cta-primary" aria-label="Update your profile criteria">Update
                                      profile criteria ↗
                                  </button>
                              </div>
                          </div>
                          <div className="stack-cta-divider"/>
                      </div>
                  </div>
              </div>
          </div>
          <Footer/>
      </main>
  );
};
