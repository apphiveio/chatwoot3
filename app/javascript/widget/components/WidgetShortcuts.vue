<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale: i18nLocale } = useI18n();

// Pick a localized value from either a plain string (legacy) or a
// { es, en, ... } object. Falls back to the first non-empty value.
const pickLocale = (value, locale) => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value !== 'object') return String(value);
  if (value[locale]) return value[locale];
  if (value.es) return value.es;
  if (value.en) return value.en;
  const first = Object.values(value).find(v => v);
  return first || '';
};

const rawShortcuts = computed(() => {
  const cfg = window.chatwootWebChannel && window.chatwootWebChannel.widgetShortcuts;
  return Array.isArray(cfg) ? cfg : [];
});

const shortcuts = computed(() =>
  rawShortcuts.value
    .map(s => ({
      icon: pickLocale(s.icon, i18nLocale.value),
      title: pickLocale(s.title, i18nLocale.value),
      subtitle: pickLocale(s.subtitle, i18nLocale.value),
      url: pickLocale(s.url, i18nLocale.value),
    }))
    .filter(s => s.title && s.url)
);

const open = url => {
  if (!url) return;
  window.open(url, '_blank', 'noopener');
};
</script>

<template>
  <div
    v-if="shortcuts.length"
    class="flex flex-col gap-2 w-full shadow outline-1 outline outline-n-container rounded-xl bg-n-background dark:bg-n-solid-2 p-2"
  >
    <button
      v-for="(s, i) in shortcuts"
      :key="i"
      class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-n-slate-2 dark:hover:bg-n-solid-3 transition-colors"
      type="button"
      @click="open(s.url)"
    >
      <span
        v-if="s.icon"
        class="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-n-slate-2 dark:bg-n-solid-3 text-lg"
      >
        {{ s.icon }}
      </span>
      <span class="flex-1 min-w-0">
        <span class="block text-sm font-medium leading-5 text-n-slate-12 truncate">
          {{ s.title }}
        </span>
        <span
          v-if="s.subtitle"
          class="block text-xs text-n-slate-11 truncate"
        >
          {{ s.subtitle }}
        </span>
      </span>
      <i class="i-lucide-arrow-up-right size-4 text-n-slate-11 flex-shrink-0" />
    </button>
  </div>
</template>
