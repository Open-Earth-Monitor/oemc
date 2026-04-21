/**
 * NUTS region country codes (ISO 3166-1 alpha-2) mapped to country names.
 * Covers EU member states, EFTA, and candidate countries included in Eurostat NUTS.
 */
const COUNTRY_NAMES: Record<string, string> = {
  AL: 'Albania',
  AT: 'Austria',
  BE: 'Belgium',
  BG: 'Bulgaria',
  CH: 'Switzerland',
  CY: 'Cyprus',
  CZ: 'Czechia',
  DE: 'Germany',
  DK: 'Denmark',
  EE: 'Estonia',
  EL: 'Greece',
  ES: 'Spain',
  FI: 'Finland',
  FR: 'France',
  HR: 'Croatia',
  HU: 'Hungary',
  IE: 'Ireland',
  IS: 'Iceland',
  IT: 'Italy',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  ME: 'Montenegro',
  MK: 'North Macedonia',
  MT: 'Malta',
  NL: 'Netherlands',
  NO: 'Norway',
  PL: 'Poland',
  PT: 'Portugal',
  RO: 'Romania',
  RS: 'Serbia',
  SE: 'Sweden',
  SI: 'Slovenia',
  SK: 'Slovakia',
  TR: 'Turkey',
  UK: 'United Kingdom',
};

export function useCountryName(code: string | null | undefined): string | null {
  if (!code) return null;
  return COUNTRY_NAMES[code] ?? code;
}
