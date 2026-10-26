import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Editor } from './components/Editor'
import { Layout } from './components/Layout'
import { Metrics } from './components/Metrics'
import { Options } from './components/Options'
import { ThemeToggle } from './components/ThemeToggle'
import { ErrorBoundary } from './components/ErrorBoundary'
import { analyzeText, makeShareHash, parseShareHash } from './lib/analyze'
import { CountOptions, defaultOptions } from './lib/types'
import './i18n/i18n'

export function App() {
  const { t, i18n } = useTranslation()
  const [text, setText] = useState('')
  const [options, setOptions] = useState<CountOptions>(defaultOptions)

  // Load from URL hash (client-only sharing)
  useEffect(() => {
    const parsed = parseShareHash(location.hash)
    if (parsed) {
      setText(parsed.text)
      setOptions(parsed.options)
    }
  }, [])

  useEffect(() => {
    const onHash = () => {
      const parsed = parseShareHash(location.hash)
      if (parsed) {
        setText(parsed.text)
        setOptions(parsed.options)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const analysis = useMemo(() => analyzeText(text, options), [text, options])

  const onShare = () => {
    location.hash = makeShareHash(text, options)
  }

  const onLanguageChange = (lang: string) => {
    document.documentElement.dir = lang.startsWith('ar') ? 'rtl' : 'ltr'
    i18n.changeLanguage(lang)
  }

  return (
    <Layout
      headerRight={<ThemeToggle />}
      title={t('title', 'Text Analyzer')}
      language={i18n.language}
      onLanguageChange={onLanguageChange}
      onShare={onShare}
    >
      <ErrorBoundary>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <section aria-labelledby="editor-heading">
            <h2 id="editor-heading" className="sr-only">
              {t('editor', 'Editor')}
            </h2>
            <Editor value={text} onChange={setText} />
            <Options value={options} onChange={setOptions} />
          </section>
          <section aria-labelledby="metrics-heading">
            <h2 id="metrics-heading" className="sr-only">
              {t('metrics', 'Metrics')}
            </h2>
            <Metrics analysis={analysis} />
          </section>
        </div>
      </ErrorBoundary>
    </Layout>
  )
}
