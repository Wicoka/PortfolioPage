// Falling / floating decoration (snow, confetti, bats) for the theme components.
// Deterministic, so the layout is the same on every load and needs no change detection.
export interface Particle {
  // Horizontal position, % of the viewport width.
  left: number;
  // Scale factor, 0.6..1.4.
  size: number;
  // Seconds for one pass.
  duration: number;
  // Negative seconds, so particles start mid-flight instead of all at the edge.
  delay: number;
}

export function scatter(count: number, minDuration: number, maxDuration: number): Particle[] {
  const span = maxDuration - minDuration;

  return Array.from({ length: count }, (_, i) => {
    // Golden-ratio steps spread the values evenly without visible patterns.
    const a = (i * 0.618034) % 1;
    const b = (i * 0.414214 + 0.3) % 1;
    const c = (i * 0.732051 + 0.6) % 1;
    const duration = minDuration + b * span;

    return {
      left: Math.round((2 + a * 96) * 10) / 10,
      size: Math.round((0.6 + c * 0.8) * 100) / 100,
      duration: Math.round(duration * 10) / 10,
      delay: -Math.round(c * duration * 10) / 10,
    };
  });
}
