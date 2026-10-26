export function ThemeToggle() {
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches
  const toggle = () => {
    const el = document.documentElement
    const currentlyDark = el.classList.toggle('force-dark')
    if (currentlyDark) {
      el.classList.add('dark')
    } else {
      el.classList.remove('dark')
    }
  }
  return (
    <button className="rounded px-3 py-1 border border-slate-300 dark:border-slate-700" onClick={toggle}>
      Theme
    </button>
  )
}
