import { useId } from 'react'
import { CountOptions } from '../lib/types'

export function Options({
  value,
  onChange,
}: {
  value: CountOptions
  onChange: (v: CountOptions) => void
}) {
  const id = useId()
  return (
    <fieldset className="mt-4 grid gap-3 border border-slate-200 dark:border-slate-800 rounded p-3">
      <legend className="px-1 text-sm text-slate-500">Options</legend>
      <label className="grid gap-1">
        <span className="text-sm">Locale</span>
        <input
          aria-label="Locale"
          className="rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1"
          value={value.locale}
          onChange={(e) => onChange({ ...value, locale: e.target.value })}
          placeholder="en, ar, zh, ja, he"
        />
      </label>
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={value.smartWordSegmentation}
          onChange={(e) => onChange({ ...value, smartWordSegmentation: e.target.checked })}
        />
        <span>Smart word segmentation</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={value.smartSentenceSegmentation}
          onChange={(e) => onChange({ ...value, smartSentenceSegmentation: e.target.checked })}
        />
        <span>Smart sentence segmentation</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={value.countSpaces}
          onChange={(e) => onChange({ ...value, countSpaces: e.target.checked })}
        />
        <span>Count spaces in characters</span>
      </label>
    </fieldset>
  )
}
