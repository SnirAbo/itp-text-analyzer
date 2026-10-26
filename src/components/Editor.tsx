import { useId } from 'react'

export function Editor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div className="grid gap-2">
      <label className="font-medium" htmlFor={id}>
        Text
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[12rem] w-full resize-y rounded border border-slate-300 dark:border-slate-700 bg-transparent p-3"
        aria-describedby={`${id}-help`}
        placeholder="Paste or type your text here..."
      />
      <div id={`${id}-help`} className="text-sm text-slate-500">
        You can paste text, type, or drop a .txt/.md file onto the editor.
      </div>
      <div className="flex gap-2">
        <button
          className="rounded px-3 py-1 border border-slate-300 dark:border-slate-700"
          onClick={() => onChange('')}
        >
          Clear
        </button>
        <button
          className="rounded px-3 py-1 border border-slate-300 dark:border-slate-700"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value)
            } catch {}
          }}
        >
          Copy
        </button>
      </div>
    </div>
  )
}
