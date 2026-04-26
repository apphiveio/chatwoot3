// Resolve a localized value from either a plain string (legacy) or a
// `{ es, en, ... }` map. Falls back to: requested locale → `es` → `en` →
// the first non-empty value.
export const pickLocale = (value, locale) => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value !== 'object') return String(value);
  if (locale && value[locale]) return value[locale];
  if (value.es) return value.es;
  if (value.en) return value.en;
  const first = Object.values(value).find(v => v);
  return first || '';
};

// Variant that takes both a plain-string fallback and an i18n map. Used
// when a feature has a legacy single-string column (e.g. WebWidget
// welcome_title) and an optional i18n override stored elsewhere.
export const pickLocaleWithFallback = (i18nMap, fallbackString, locale) => {
  const fromMap = pickLocale(i18nMap, locale);
  if (fromMap) return fromMap;
  return fallbackString || '';
};
