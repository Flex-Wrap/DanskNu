# Internationalization (i18n) Setup

This project uses `i18next` and `react-i18next` for multi-language support.

## Current Setup

- **i18n config**: `src/i18n/config.ts` - Initializes i18next with available languages
- **English translations**: `src/i18n/en.json` - Main translation file
- **Initialized in**: `src/main.tsx` - i18n is loaded before the app renders

## How to Use Translations in Components

### Basic Usage with `useTranslation` Hook

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return <h1>{t('pages.home.title')}</h1>
}
```

### Translation Key Structure

Keys follow a nested path structure in the JSON file:
- `common.back` → `{ "common": { "back": "Back" } }`
- `navigation.quiz.title` → `{ "navigation": { "quiz": { "title": "Quiz" } } }`
- `forms.emailForm.submitButton` → `{ "forms": { "emailForm": { "submitButton": "..." } } }`

## Adding New Languages

1. Create a new JSON file in `src/i18n/` (e.g., `da.json` for Danish)
2. Copy the structure from `en.json` and translate all strings
3. Update `src/i18n/config.ts` to include the new language:

```ts
import en from './en.json'
import da from './da.json'

const resources = {
  en: { translation: en },
  da: { translation: da },  // Add this
}
```

4. To switch languages at runtime (optional):

```tsx
const { i18n } = useTranslation()
i18n.changeLanguage('da')
```

## Updated Components

The following components have been updated to use i18n:
- `src/routes/index.tsx` (Home page)
- `src/components/EmailForm.tsx` (Email form)
- `src/components/QuizResult.tsx` (Quiz results)

## Pattern to Follow

When updating other components, replace hardcoded strings with:
```tsx
const { t } = useTranslation()
// Then use: t('key.path.here')
```
