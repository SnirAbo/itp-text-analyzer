import { PropsWithChildren } from 'react'

export function Layout({
  children,
  title,
  headerRight,
  language,
  onLanguageChange,
  onShare,
}: PropsWithChildren<{
  title: string
  headerRight?: React.ReactNode
  language: string
  onLanguageChange: (lang: string) => void
  onShare: () => void
}>) {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <select
              aria-label="Language"
              className="rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <button className="rounded px-3 py-1 border border-slate-300 dark:border-slate-700" onClick={onShare}>
              Share link
            </button>
            {headerRight}
          </div>
        </div>
      </header>
      <main id="app" className="mx-auto max-w-5xl px-4 py-6">
        {children}
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-500">
        <p>
          No text leaves your browser by default. Optional sharing is client-only via URL hash or
          KV-backed link when configured.
        </p>
      </footer>
    </div>
  )
}
