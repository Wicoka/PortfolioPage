// Seasonal looks. Which one is on is decided by the visitor's local date alone, once, on load.
// Each id has its own component in themes/; its styles only apply under
// <html data-season="<id>">, which SeasonalThemeService sets.

// Order is priority: the first id whose window contains the date wins.
export const SEASONAL_THEME_IDS = [
  // REMOVE-AFTER-2026-12: GTA VI launch look, temporary.
  'gta',
  'christmas',
  'new-year',
  'easter',
  'halloween',
] as const;

export type SeasonalThemeId = (typeof SEASONAL_THEME_IDS)[number];

// REMOVE-AFTER-2026-12: the GTA VI look runs until (not including) 1 December 2026, local time.
// After December 2026 delete it everywhere: grep -rn "REMOVE-AFTER-2026-12" src
export const GTA_CAMPAIGN_END = new Date(2026, 11, 1);

const DAY_MS = 24 * 60 * 60 * 1000;

// month is 1..12, so the windows below read like a calendar.
const monthDay = (month: number, day: number): number => month * 100 + day;
const monthDayOf = (date: Date): number => monthDay(date.getMonth() + 1, date.getDate());

// Inclusive on both ends. A window whose end comes before its start wraps over New Year.
function isWithin(date: Date, from: number, to: number): boolean {
  const today = monthDayOf(date);
  return from <= to ? today >= from && today <= to : today >= from || today <= to;
}

// Easter Sunday in the Gregorian calendar (anonymous Gregorian / Meeus–Jones–Butcher algorithm).
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

// Whole calendar days from `anchor` to `date`; rounding absorbs the DST hour.
function daysFrom(anchor: Date, date: Date): number {
  const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((midnight.getTime() - anchor.getTime()) / DAY_MS);
}

// A Record, so adding an id without a window does not compile.
const SEASON_WINDOWS: Record<SeasonalThemeId, (date: Date) => boolean> = {
  // REMOVE-AFTER-2026-12
  gta: (date) => date < GTA_CAMPAIGN_END,
  // Advent to Boxing Day.
  christmas: (date) => isWithin(date, monthDay(12, 1), monthDay(12, 26)),
  'new-year': (date) => isWithin(date, monthDay(12, 30), monthDay(1, 2)),
  // Good Friday to Easter Monday (both are public holidays in Hungary).
  easter: (date) => {
    const offset = daysFrom(easterSunday(date.getFullYear()), date);
    return offset >= -2 && offset <= 1;
  },
  halloween: (date) => isWithin(date, monthDay(10, 25), monthDay(10, 31)),
};

export function resolveSeasonalTheme(date: Date): SeasonalThemeId | null {
  return SEASONAL_THEME_IDS.find((id) => SEASON_WINDOWS[id](date)) ?? null;
}
