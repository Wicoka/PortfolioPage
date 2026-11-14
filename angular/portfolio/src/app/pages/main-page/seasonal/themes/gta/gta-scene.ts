// REMOVE-AFTER-2026-12: whole file.
// Geometry of the GTA VI backdrop: a night-time neon beach in a 1600x900 viewBox, horizon at
// HORIZON. Everything is deterministic, so the scene is identical on every load.
//
// Contrast rule (see ARCHI.md): text scrolls over every part of this layer, so a pixel may get no
// brighter than about sRGB 78 per channel (--text-soft keeps 4.5:1 above it). Silhouettes are dark
// and fully opaque; every light source (sun, windows, neon, reflection, stars) is drawn at an
// opacity that keeps it under that line. Keep to that when adding detail.

export const HORIZON = 660;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Light extends Rect {
  color: string;
}

export interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

// Cheap deterministic noise in 0..1.
const noise = (seed: number): number => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

// [x, width, height]: two clusters, leaving the middle open for the sun.
const BUILDINGS: Array<[number, number, number]> = [
  [0, 70, 150],
  [70, 50, 110],
  [120, 90, 210],
  [210, 60, 140],
  [270, 80, 180],
  [350, 55, 120],
  [405, 75, 165],
  [480, 45, 90],
  [525, 40, 60],
  [1035, 40, 70],
  [1075, 60, 130],
  [1135, 85, 200],
  [1220, 55, 110],
  [1275, 90, 175],
  [1365, 60, 230],
  [1425, 70, 140],
  [1495, 50, 100],
  [1545, 55, 160],
];

const WARM = '#ffcf6b';
const TEAL = '#6ff7ff';
const PINK = '#ff4fa3';

export const buildings: Rect[] = BUILDINGS.map(([x, width, height]) => ({
  x,
  y: HORIZON - height,
  width,
  height,
}));

// Stepped Art Deco crowns and antennas on the tall towers.
export const crowns: Rect[] = buildings
  .filter((b) => b.height >= 165)
  .flatMap((b) => [
    { x: b.x + b.width * 0.2, y: b.y - 16, width: b.width * 0.6, height: 16 },
    { x: b.x + b.width / 2 - 1.5, y: b.y - 52, width: 3, height: 36 },
  ]);

// Lit windows: about a third of the grid, one in five of those teal.
export const windows: Light[] = buildings.flatMap((b, i) => {
  const lights: Light[] = [];
  const cols = Math.floor((b.width - 12) / 14);
  const rows = Math.floor((b.height - 24) / 18);

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const n = noise(i * 131 + c * 17 + r * 7 + 1);

      if (n < 0.32) {
        lights.push({
          x: b.x + 8 + c * 14,
          y: b.y + 14 + r * 18,
          width: 6,
          height: 9,
          color: n < 0.07 ? TEAL : WARM,
        });
      }
    }
  }

  return lights;
});

// Neon trim along the roofline of every fourth building.
export const neon: Light[] = buildings
  .filter((_, i) => i % 4 === 1)
  .map((b, i) => ({
    x: b.x,
    y: b.y,
    width: b.width,
    height: 3,
    color: i % 2 ? TEAL : PINK,
  }));

// The sun's reflection on the water: stripes narrowing towards the viewer.
export const reflection: Rect[] = Array.from({ length: 11 }, (_, i) => {
  const width = 360 - i * 26 + (noise(i + 50) - 0.5) * 40;
  return { x: 800 - width / 2, y: HORIZON + 10 + i * 20, width, height: 4 + i * 0.6 };
});

export const stars: Star[] = Array.from({ length: 46 }, (_, i) => ({
  cx: Math.round(noise(i + 200) * 1600),
  cy: Math.round(20 + noise(i + 300) * 360),
  r: Math.round((0.8 + noise(i + 400) * 1.4) * 10) / 10,
  delay: -Math.round(noise(i + 500) * 40) / 10,
}));

// ---------- Palms ----------
// Each palm is generated: a slender tapering trunk with a gentle S-curve and rings, and a crown of
// arching fronds. A frond is a quadratic midrib that droops under its own weight, with narrow
// leaflets hanging from both sides, longest near the crown. Two shapes, so the beach does not look
// copy-pasted; mirrored placements lean the other way.

export interface PalmShape {
  trunk: string;
  rings: string;
  midribs: string;
  leaflets: string;
  coconuts: Array<{ cx: number; cy: number; r: number }>;
}

export interface PalmPlacement {
  shape: 'a' | 'b';
  transform: string;
}

type Point = [number, number];

const f1 = (n: number): string => n.toFixed(1);

function trunkPoint(height: number, lean: number, t: number): Point {
  return [lean * t ** 1.8 + 6 * Math.sin(t * Math.PI), -height * t];
}

// [angle in degrees (0 = right, -90 = up, 180 = left), length]
function palmShape(height: number, lean: number, fronds: Array<[number, number]>): PalmShape {
  const samples = Array.from({ length: 15 }, (_, i) => i / 14);
  const half = (t: number): number => 9 - 4.5 * t;
  const left = samples.map((t) => {
    const [x, y] = trunkPoint(height, lean, t);
    return `${f1(x - half(t))} ${f1(y)}`;
  });
  const right = samples
    .slice()
    .reverse()
    .map((t) => {
      const [x, y] = trunkPoint(height, lean, t);
      return `${f1(x + half(t))} ${f1(y)}`;
    });
  const trunk = `M${left.join('L')}L${right.join('L')}Z`;

  const rings = Array.from({ length: 13 }, (_, i) => {
    const t = 0.06 + i * 0.07;
    const [x, y] = trunkPoint(height, lean, t);
    const w = half(t);
    return `M${f1(x - w)} ${f1(y)}q${f1(w)} 4 ${f1(w * 2)} 0`;
  }).join('');

  const [cx, cy] = trunkPoint(height, lean, 1);
  let midribs = '';
  let leaflets = '';

  for (const [angle, length] of fronds) {
    const a = (angle * Math.PI) / 180;
    const dir: Point = [Math.cos(a), Math.sin(a)];
    // Horizontal fronds sag the most, upright ones hardly at all.
    const droop = length * (0.3 + 0.5 * dir[0] ** 2);
    const p0: Point = [cx, cy];
    // The control point is lifted, so the frond first rises, then arches over and droops.
    const p1: Point = [cx + dir[0] * length * 0.55, cy + dir[1] * length * 0.55 - length * 0.22];
    const p2: Point = [cx + dir[0] * length, cy + dir[1] * length + droop];

    midribs += `M${f1(p0[0])} ${f1(p0[1])}Q${f1(p1[0])} ${f1(p1[1])} ${f1(p2[0])} ${f1(p2[1])}`;

    for (let t = 0.1; t <= 0.98; t += 0.04) {
      const u = 1 - t;
      const px = u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0];
      const py = u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1];
      const tx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
      const ty = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
      const tl = Math.hypot(tx, ty) || 1;
      const T: Point = [tx / tl, ty / tl];
      const N: Point = [-T[1], T[0]];
      // Longest around the middle of the frond, short at the base and the tip.
      const leaflet = length * 0.25 * Math.sin(Math.PI * (0.15 + 0.8 * t)) + 3;

      for (const side of [1, -1]) {
        // Out to the side, slightly swept towards the tip, and hanging down like a curtain.
        const dx = side * N[0] * 0.7 + T[0] * 0.3;
        const dy = side * N[1] * 0.7 + T[1] * 0.3 + 1.1;
        const dl = Math.hypot(dx, dy) || 1;
        leaflets += `M${f1(px)} ${f1(py)}l${f1((dx / dl) * leaflet)} ${f1((dy / dl) * leaflet)}`;
      }
    }
  }

  return {
    trunk,
    rings,
    midribs,
    leaflets,
    coconuts: [
      { cx: cx - 6, cy: cy + 9, r: 6.5 },
      { cx: cx + 6, cy: cy + 10, r: 6 },
      { cx, cy: cy + 15, r: 5.5 },
    ],
  };
}

// A: tall and leaning, full crown with two hanging fronds.
export const palmA = palmShape(330, 60, [
  [-175, 175],
  [-150, 185],
  [-125, 165],
  [-100, 135],
  [-75, 140],
  [-52, 170],
  [-25, 185],
  [2, 175],
  [30, 140],
  [155, 140],
  [130, 115],
]);

// B: shorter and straighter, a smaller crown.
export const palmB = palmShape(250, 22, [
  [-170, 145],
  [-142, 155],
  [-112, 130],
  [-82, 120],
  [-55, 140],
  [-25, 150],
  [5, 135],
  [150, 120],
  [32, 110],
]);

// Foreground palms: big ones at the edges for wide screens, smaller ones further back, and two
// near the middle so a phone (which only shows the centre of the slice) still gets palms.
export const palms: PalmPlacement[] = [
  { shape: 'a', transform: 'translate(80 905) scale(1.05)' },
  { shape: 'a', transform: 'translate(1520 905) scale(-1.1 1.1)' },
  { shape: 'b', transform: 'translate(330 880) scale(0.72)' },
  { shape: 'b', transform: 'translate(1290 884) scale(-0.7 0.7)' },
  { shape: 'a', transform: 'translate(585 905) scale(0.7)' },
  { shape: 'b', transform: 'translate(1030 905) scale(-0.85 0.85)' },
];
