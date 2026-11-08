---
name: Job Finder
description: AI-matched job alerts. One email. No noise.
colors:
  precision-blue: "oklch(52% 0.20 245)"
  precision-blue-deep: "oklch(42% 0.18 245)"
  precision-blue-light: "oklch(94% 0.04 245)"
  ink: "oklch(18% 0.006 55)"
  ink-sub: "oklch(42% 0.007 55)"
  ink-faint: "oklch(62% 0.007 55)"
  surface-base: "oklch(99% 0.004 75)"
  surface-raised: "oklch(97.5% 0.005 75)"
  surface-float: "oklch(95.5% 0.006 75)"
  surface-border: "oklch(88% 0.008 75)"
  surface-muted: "oklch(78% 0.008 65)"
  danger: "oklch(52% 0.22 25)"
typography:
  display:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: "clamp(2.5rem, 7vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  none: "0"
  sm: "2px"
  md: "0.625rem"
  lg: "0.75rem"
spacing:
  xs: "0.5rem"
  sm: "0.875rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3.5rem"
components:
  card-border: "2px solid {colors.ink}"
  card-shadow: "3px 3px 0 {colors.ink}"
  button-primary:
    backgroundColor: "{colors.precision-blue}"
    textColor: "{colors.surface-base}"
    rounded: "{rounded.none}"
    padding: "0.875rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.precision-blue}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.875rem 2rem"
  token-field:
    background: "{colors.surface-float}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.none}"
    focusShadow: "3px 3px 0 {colors.precision-blue}"
  tag-badge:
    background: "{colors.precision-blue}"
    textColor: "{colors.surface-base}"
    border: "1.5px solid {colors.ink}"
    rounded: "{rounded.none}"
  stack-card:
    background: "{colors.surface-raised}"
    border: "{components.card-border}"
    rounded: "{rounded.none}"
    activeShadow: "{components.card-shadow}"
---

# Design System: Job Finder

## Color Strategy

**Restrained** with committed accent. The surface system is warm off-white neutrals; the single committed accent is
precision blue (oklch hue 245). Blue was chosen to differentiate sharply from the orange/amber SaaS-warm reflex, while
avoiding the navy/corporate trap. It reads as precise and tool-like without being cold.

The CSS custom property `--clr-amber` was renamed to reflect steel blue — the variable name is legacy but the value is
blue.

## Accent Token

The brand accent (`--clr-amber` / `precision-blue`) is `oklch(52% 0.20 245)` — a saturated steel blue. Used for:

- Badge backgrounds (`.tag-badge`, `.stack-badge`, `.benefit-badge`)
- Button backgrounds (`.minimal-btn`, `.stack-cta-primary`)
- Eyebrow text (`.eyebrow`)
- Dot cluster decoration
- Focus/active rings
- Link underline animation
- Feature icon color

## Typography Scale

Two font families → one:

| Role              | Family | Weight  | Notes                                          |
|-------------------|--------|---------|------------------------------------------------|
| Everything        | Geist  | 400–700 | Headings capped at bold (700); no body italics  |

Scale classes: `.heading-xl` (hero h1), `.section-heading` (+ `--xl/--lg/--md/--sm` variants), `.subcopy` (+ `-sm`), `.eyebrow`, `.tag-meta`, `.micro-hint`

## Aesthetic

**Neo-brutalist with restraint.** Key signals:

- Zero border-radius on interactive elements (buttons, token fields, tag badges, chips, stack cards)
- Hard box-shadows offset at 3px with no blur (`box-shadow: var(--card-shadow)` = `3px 3px 0 var(--clr-text)`). Buttons
  use 4px.
- Press-down interaction: shadow shrinks + element translates on hover/active
- Thick 2px borders on forms and cards
- Light surface (warm off-white base), not dark
- Geist everywhere, bold (700) max at large sizes; line-heights paired to the type scale (1.0–1.05 display)

## Components

### Buttons

`.minimal-btn` and `.stack-cta-primary`: flat fill with hard offset shadow. No radius. Press interaction built in.

### Token fields

`.token-field` + `.tag-badge` + `.tag-input`: tag-style multi-value inputs. Flat border, no radius. Tags use accent
fill.

### Stack cards

`.stack-card`: sticky scroll-stacking cards. Scale/translate offset when inactive. Hard shadow + border on active.

### Form grid

`.form-grid`: 2-column CSS grid at md+, 1-column mobile.

## Do / Don't

| Do                                                    | Don't                                                 |
|-------------------------------------------------------|-------------------------------------------------------|
| Use `--clr-amber` (= precision blue) for accent fills | Introduce orange, amber, or warm accent colors        |
| Use zero border-radius for interactive elements       | Use rounded corners on buttons, chips, or tag badges  |
| Use hard offset shadows (no blur)                     | Use soft/blurred drop shadows on interactive elements |
| Keep body copy ≤75ch                                  | Stretch paragraphs full-width                         |
| Use Geist 700 for headings                            | Mix heading fonts within a section                    |
| Keep surfaces warm off-white                          | Go dark or pure white                                 |
