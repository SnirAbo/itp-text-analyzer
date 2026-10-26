import Graphemer from 'graphemer'

const splitter = new Graphemer()

export function countGraphemes(text: string, includeSpaces: boolean): number {
  if (!includeSpaces) {
    text = text.replace(/\s+/g, '')
  }
  return splitter.splitGraphemes(text).length
}

export function countParagraphs(text: string): number {
  const blocks = text.trim().split(/(?:\r?\n){2,}/).filter(Boolean)
  return blocks.length
}
