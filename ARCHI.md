# ARCHI.md — PortfolioPage

_Last updated: 2026-10-31_

Personal portfolio site of Viktor Szőke. The live app is the Angular project in
`angular/portfolio/`. **All commands and paths below are relative to `angular/portfolio/`**
unless they start with the repo root.

Everything else at the repo root (`Build/`, `Build v2.0/`, `Good freelancer Template/`,
`Nuno Theme Starter Files/`, `Parallax Website Files/`, `3-Complete Responsive …/`, the `.zip`
files) is old static templates and earlier builds. They are not wired into the Angular app.

## Stack

- Angular 15 (NgModule-based, not standalone), TypeScript 4.9, SCSS.
- Tailwind 3 is configured (`tailwind.config.js`, `@tailwind` directives in `src/styles.scss`),
  but the templates use hand-written BEM-style classes, not Tailwind utilities. Tailwind's
  preflight reset is still active, so headings/lists start unstyled.
- `ngx-scrollreveal` + `scrollreveal` for reveal-on-scroll (`[ngsReveal]` directive; the
  global script is loaded via `angular.json` → `scripts`).
- `@vercel/analytics` is injected once in `AppComponent`.
- `@angular/material` is installed and its prebuilt theme is in `angular.json` styles, but no
  Material component is currently used (see the orphaned dialog below).
- Fonts: system font stack first (SF Pro on Apple devices), Inter from Google Fonts as fallback.
  Boxicons (unpkg CDN, `index.html`) provides the `bx` icon classes.

## Startup and config

- `src/main.ts` bootstraps `AppModule`; `app-routing.module.ts` lazy-loads `MainPageModule` on
  `''` and redirects everything else there. There is only one page.
- No environments/config files. The contact endpoint (FormSubmit AJAX URL) is hard-coded in
  `MainPageService`.

## Layout

```
src/
  index.html, styles.scss          global shell + ALL page styles (see Conventions)
  assets/                          images, CV pdf (portrait.webp is the one used by the hero)
  app/
    app.module.ts / app-routing    root, lazy route to main-page
    pages/main-page/
      main-page.component.*        the whole one-page site: header, hero, work, about, contact
      main-page.service.ts         CV download, project data, contact form POST
      models/project.model.ts      Project interface
      components/ambient-background/   fixed, pointer-reactive background
      directives/spotlight.directive.ts  per-element cursor highlight
      components/project-dialog/   ORPHANED: not declared in any module, not built
```

`dist/`, `.angular/` and `node_modules/` are generated.

## Reusable inventory

- `MainPageService` (`pages/main-page/main-page.service.ts`)
  - `getProjects()` — returns the static project list defined at the bottom of the file.
    Project copy lives here, not in the template.
  - `sendContactMessage(payload)` — POSTs to FormSubmit; `subject` falls back to
    "Website contact from <name>" when empty. Returns `Observable<string>` (text response).
  - `downloadCV()` — fetches `assets/Viktor_Szoke_CV.pdf` as a blob and triggers a download.
- `AmbientBackgroundComponent` (`<app-ambient-background>`) — fixed full-viewport layer. It
  writes three CSS custom properties on `document.documentElement`, eased toward the pointer
  in a `requestAnimationFrame` loop that runs outside `NgZone` and stops once settled:
  - `--pointer-x`, `--pointer-y`: 0..1 viewport-relative pointer position;
  - `--hue`: derived from the position, clamped by construction to 215..320. The hero headline
    gradient (`.gradient-text`) uses it for text colour, so keep the range clear of cyan/green
    (contrast on the light background); its lightness is the `--gradient-lightness` token.
  Any element can read these (the hero headline gradient and the portrait parallax do).
  Defaults are declared on `:root` in `styles.scss`, so they are valid before the first move
  and under `prefers-reduced-motion` (where the component does not track at all).
- `SpotlightDirective` (`[appSpotlight]`) — sets `--spot-x` / `--spot-y` (px, element-relative)
  on its host on pointer move, outside `NgZone`. Pair it with CSS that reads those vars
  (see `.project-card::before`). Use this instead of a `HostListener('mousemove')`, which would
  run change detection on every mouse event.

## Conventions

- Page styles live in the global `src/styles.scss`, not in component SCSS. Component styles
  are kept tiny because of the `anyComponentStyle` budget (2 kB warn / 10 kB error in
  `angular.json`).
- `html { font-size: 62.5% }`, so `1rem = 10px`. Sizes are written in `rem` with that in mind.
- Colours are CSS custom properties on `:root` with a `prefers-color-scheme: dark` override.
  Do not hard-code colours in rules; add a token.
- Motion respects `prefers-reduced-motion` (CSS media query + the checks in
  `MainPageComponent` and `AmbientBackgroundComponent`).
- High-frequency DOM listeners (pointer/scroll animation) run outside `NgZone` and write CSS
  variables directly instead of binding through the template.
- Copy is short, first person, plain English.

## Build and verification

```bash
npm install
npx ng build          # production build; this is the check that matters
npx ng serve          # dev server on :4200
```

Known broken / noisy:

- `app.component.spec.ts` still contains the CLI scaffold test that looks for `.content span`
  ("portfolio app is running!"). `AppComponent`'s template is only `<router-outlet>`, so that
  assertion cannot pass; `ng test` is not a usable signal until the spec is fixed.
- `ng build` prints Tailwind's "No utility classes were detected" warning, because no template
  uses Tailwind utilities. Harmless.
