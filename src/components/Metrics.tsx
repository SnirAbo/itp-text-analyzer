import { AnalysisResult } from '../lib/types'

export function Metrics({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" aria-live="polite">
        <Metric label="Words" value={analysis.counts.words} tooltip="Based on segmentation" />
        <Metric label="Sentences" value={analysis.counts.sentences} />
        <Metric label="Paragraphs" value={analysis.counts.paragraphs} />
        <Metric label="Chars (w/ spaces)" value={analysis.counts.charsWithSpaces} />
        <Metric label="Chars (no spaces)" value={analysis.counts.charsNoSpaces} />
        <Metric label="Reading time" value={analysis.readingTime} />
      </div>
      <details>
        <summary className="cursor-pointer text-sm text-slate-500">Definitions</summary>
        <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
          <li>Words/sentences: Intl.Segmenter when available, else regex fallback.</li>
          <li>Characters: Grapheme clusters (emoji and combining marks count as one).</li>
        </ul>
      </details>
    </div>
  )
}

function Metric({ label, value, tooltip }: { label: string; value: number | string; tooltip?: string }) {
  return (
    <div
      className="rounded border border-slate-200 dark:border-slate-800 p-3"
      data-tooltip={tooltip || undefined}
    >
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-semibold tabular-nums">{String(value)}</div>
    </div>
  )
}
