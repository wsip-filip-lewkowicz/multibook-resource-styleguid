function shouldIncreaseIndent(line: string): boolean {
  return !!line.match(/^<[a-z]/) && !line.match(/\/>$/) && !line.match(/<\/[^>]+>$/)
}

export function formatHtmlCode(code: string): string {
  let formatted = ''
  let indent = 0
  const lines = code
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  for (const line of lines) {
    if (line.match(/^<\//)) {
      indent = Math.max(0, indent - 1)
    }

    formatted += '  '.repeat(indent) + line + '\n'

    if (shouldIncreaseIndent(line)) {
      indent++
    }
  }

  return formatted.trim()
}
