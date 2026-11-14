// REMOVE-AFTER-2026-12: whole folder. GTA VI launch look, active until GTA_CAMPAIGN_END.
// To remove: delete this folder, its id in SEASONAL_THEME_IDS / SEASON_WINDOWS / GTA_CAMPAIGN_END,
// its declaration in MainPageModule, its case in SeasonalThemeComponent and its names in
// translations.ts. `grep -rn "REMOVE-AFTER-2026-12" src` lists every spot.
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
  buildings,
  crowns,
  HORIZON,
  neon,
  palmA,
  palmB,
  palms,
  reflection,
  stars,
  windows,
} from './gta-scene';

// A night-time neon beach, drawn as one SVG: starry sky, striped retro sun, Art Deco skyline with
// lit windows and neon trim, the sun's reflection on the sea, and palms on the beach.
// Colours are inline (like the illustrations): the stylesheet sits at the 2 kB budget. The
// opacities of the light sources are part of the contrast budget; see gta-scene.ts.
// "xMidYMax slice" keeps the beach at the bottom and crops the sides on narrow screens.
@Component({
  selector: 'app-gta-theme',
  template: `
    <svg
      class="gta__scene"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      focusable="false"
    >
      <defs>
        <linearGradient id="gta-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#120a1f" />
          <stop offset="0.45" stop-color="#1f0c36" />
          <stop offset="0.8" stop-color="#3a1450" />
          <stop offset="1" stop-color="#4a1a55" />
        </linearGradient>
        <linearGradient id="gta-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2a0f3d" />
          <stop offset="1" stop-color="#120a1f" />
        </linearGradient>
        <linearGradient id="gta-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffc95e" />
          <stop offset="0.55" stop-color="#ff7a59" />
          <stop offset="1" stop-color="#ff2e88" />
        </linearGradient>
        <!-- Retro sun: gaps that widen towards the horizon. -->
        <mask id="gta-sun-stripes" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
          <rect width="1600" height="900" fill="#fff" />
          <rect y="520" width="1600" height="4" fill="#000" />
          <rect y="556" width="1600" height="7" fill="#000" />
          <rect y="590" width="1600" height="10" fill="#000" />
          <rect y="620" width="1600" height="13" fill="#000" />
          <rect y="645" width="1600" height="15" fill="#000" />
        </mask>
        <!-- The two palm shapes from gta-scene.ts; base at 0,0. -->
        <g *ngFor="let shape of palmShapes" [attr.id]="'gta-palm-' + shape.id">
          <path [attr.d]="shape.palm.trunk" fill="#0a0512" />
          <path [attr.d]="shape.palm.rings" fill="none" stroke="#2a1638" stroke-width="2" />
          <path
            [attr.d]="shape.palm.leaflets"
            fill="none"
            stroke="#0a0512"
            stroke-width="2.6"
            stroke-linecap="round"
          />
          <path
            [attr.d]="shape.palm.midribs"
            fill="none"
            stroke="#0a0512"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle
            *ngFor="let c of shape.palm.coconuts"
            [attr.cx]="c.cx"
            [attr.cy]="c.cy"
            [attr.r]="c.r"
            fill="#0a0512"
          />
        </g>
      </defs>

      <rect [attr.height]="horizon" width="1600" fill="url(#gta-sky)" />
      <circle
        *ngFor="let star of stars"
        class="gta__star"
        [attr.cx]="star.cx"
        [attr.cy]="star.cy"
        [attr.r]="star.r"
        [style.animation-delay.s]="star.delay"
        fill="#fff"
        opacity="0.22"
      />

      <g opacity="0.28" mask="url(#gta-sun-stripes)">
        <circle cx="800" cy="600" r="210" fill="url(#gta-sun)" />
      </g>
      <path
        d="M880 404q8-7 16 0q8-7 16 0M922 428q6-5 12 0q6-5 12 0M902 446q5-4 10 0q5-4 10 0"
        fill="none"
        stroke="#0a0512"
        stroke-width="3"
        stroke-linecap="round"
      />

      <g fill="#1a0b2a">
        <rect
          *ngFor="let b of buildings"
          [attr.x]="b.x"
          [attr.y]="b.y"
          [attr.width]="b.width"
          [attr.height]="b.height"
        />
        <rect
          *ngFor="let c of crowns"
          [attr.x]="c.x"
          [attr.y]="c.y"
          [attr.width]="c.width"
          [attr.height]="c.height"
        />
      </g>
      <g opacity="0.28">
        <rect
          *ngFor="let w of windows"
          [attr.x]="w.x"
          [attr.y]="w.y"
          [attr.width]="w.width"
          [attr.height]="w.height"
          [attr.fill]="w.color"
        />
      </g>
      <g opacity="0.28">
        <rect
          *ngFor="let n of neon"
          [attr.x]="n.x"
          [attr.y]="n.y"
          [attr.width]="n.width"
          [attr.height]="n.height"
          [attr.fill]="n.color"
        />
      </g>

      <rect [attr.y]="horizon" width="1600" height="240" fill="url(#gta-sea)" />
      <g class="gta__shimmer" opacity="0.28" fill="#ff7a59">
        <rect
          *ngFor="let r of reflection"
          [attr.x]="r.x"
          [attr.y]="r.y"
          [attr.width]="r.width"
          [attr.height]="r.height"
          rx="2"
        />
      </g>

      <g fill="#0a0512">
        <path d="M0 900V852Q200 832 400 860T800 878T1200 860T1600 846V900Z" />
        <use
          *ngFor="let palm of palms"
          [attr.href]="'#gta-palm-' + palm.shape"
          [attr.transform]="palm.transform"
        />
      </g>
    </svg>
  `,
  styleUrls: ['./gta-theme.component.scss'],
  // The styles re-theme the whole page, keyed on <html data-season="gta">.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GtaThemeComponent {
  readonly horizon = HORIZON;
  readonly stars = stars;
  readonly buildings = buildings;
  readonly crowns = crowns;
  readonly windows = windows;
  readonly neon = neon;
  readonly reflection = reflection;
  readonly palms = palms;
  readonly palmShapes = [
    { id: 'a', palm: palmA },
    { id: 'b', palm: palmB },
  ];
}
