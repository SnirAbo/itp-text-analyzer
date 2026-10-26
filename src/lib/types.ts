export type CountOptions = {
  locale: string
  smartWordSegmentation: boolean
  smartSentenceSegmentation: boolean
  countSpaces: boolean
}

export const defaultOptions: CountOptions = {
  locale: 'en',
  smartWordSegmentation: true,
  smartSentenceSegmentation: true,
  countSpaces: true,
}

export type Counts = {
  words: number
  sentences: number
  paragraphs: number
  charsWithSpaces: number
  charsNoSpaces: number
}

export type AnalysisResult = {
  textLength: number
  counts: Counts
  readingTime: string
}
