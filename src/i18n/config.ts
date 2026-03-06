import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import da from './da.json'
import es from './es.json'
import de from './de.json'
import pl from './pl.json'

const resources = {
  en: {
    translation: en,
  },
  da: {
    translation: da,
  },
  es: {
    translation: es,
  },
  de: {
    translation: de,
  },
  pl: {
    translation: pl,
  },
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'da',
    fallbackLng: 'da',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
