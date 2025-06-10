import { ref } from 'vue'

const locale = ref(localStorage.getItem('locale') || 'en')

export function __t(key, params) {
  if (!window.translations) return key

  const value = window.translations.find((t) => t.key === key)
  if (!value) return key

  let translation = value['value_' + locale.value] || key

  if (params && translation) {
    for (const [paramKey, paramValue] of Object.entries(params)) {
      translation = translation.replace(`{${paramKey}}`, paramValue)
    }
  }

  return translation
}

export function switchLocale(newLocale) {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

export function currentLocale() {
  return locale.value
}

export function useLocale() {
  return { locale, switchLocale }
}

export async function loadTranslations() {
  const home = await import('@/lang/home.json')

  const allTranslations = [
    ...home.default.translations,
  ]

  window.translations = allTranslations

  return allTranslations
}
