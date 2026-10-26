import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      title: 'Text Analyzer',
      editor: 'Editor',
      metrics: 'Metrics'
    }
  },
  ar: {
    translation: {
      title: 'محلل النص',
      editor: 'المحرر',
      metrics: 'المقاييس'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  })

export default i18n
