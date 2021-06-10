import * as messages from '@cucumber/messages'

export type Syntax = 'markdown' | 'gherkin'

export default function pretty(
  gherkinDocument: messages.GherkinDocument,
  syntax: Syntax = 'gherkin'
): string {
  const feature = gherkinDocument.feature
  if (!feature) return ''
  let s = ''

  s += prettyTags(feature.tags, 0, syntax)
  s += `${keywordPrefix(0, syntax) + feature.keyword}: ${feature.name}
`
  if (feature.description) {
    s += formatDescription(feature.description, syntax)
  }
  for (const child of feature.children) {
    if (child.background) {
      s += prettyStepContainer(child.background, 1, syntax)
    } else if (child.scenario) {
      s += prettyStepContainer(child.scenario, 1, syntax)
    } else if (child.rule) {
      const rule = child.rule
      s += prettyRule(rule, syntax)
    }
  }
  return s
}

function prettyRule(rule: messages.Rule, syntax: Syntax) {
  let s = ''
  if (rule.tags.length > 0) {
    s += `\n${prettyTags(rule.tags, 1, syntax)}`
  }
  s += `\n${keywordPrefix(1, syntax)}${rule.keyword}: ${rule.name}\n`
  if (rule.description) {
    s += formatDescription(rule.description, syntax)
  }
  for (const ruleChild of rule.children) {
    if (ruleChild.background) {
      s += prettyStepContainer(ruleChild.background, 2, syntax)
    }
    if (ruleChild.scenario) {
      s += prettyStepContainer(ruleChild.scenario, 2, syntax)
    }
  }
  return s
}

function prettyStepContainer(
  stepContainer: messages.Scenario | messages.Background,
  level: number,
  syntax: Syntax
): string {
  const scenario: messages.Scenario = 'tags' in stepContainer ? stepContainer : null
  const tags: readonly messages.Tag[] = scenario?.tags || []
  let s = `\n${prettyTags(tags, level, syntax)}${keywordPrefix(level, syntax)}${stepContainer.keyword}: ${
    stepContainer.name
  }\n`
  if (stepContainer.description) {
    s += formatDescription(stepContainer.description, syntax) + '\n'
  }

  for (const step of stepContainer.steps) {
    s += prettyStep(step, level + 1, syntax)
  }

  if (scenario) {
    for (const example of scenario.examples) {
      s += prettyExample(example, level + 1, syntax)
    }
  }
  return s
}

function prettyStep(step: messages.Step, level: number, syntax: Syntax) {
  let s = `${stepPrefix(level, syntax)}${step.keyword}${step.text}\n`
  if (step.dataTable) {
    s += prettyTableRows(step.dataTable.rows, level + 1, syntax)
  }
  if (step.docString) {
    s += prettyDocString(step.docString, level + 1, syntax)
  }
  return s
}

function prettyExample(example: messages.Examples, level: number, syntax: Syntax): string {
  let s = ''
  if (example.tags.length > 0) {
    s += `\n${prettyTags(example.tags, level, syntax)}`
  }
  s += `\n${keywordPrefix(level, syntax)}Examples: ${example.name}\n`
  if (example.tableHeader) {
    const tableRows = [example.tableHeader, ...example.tableBody]
    s += prettyTableRows(tableRows, level + 1, syntax)
  }
  return s
}

function prettyDocString(docString: messages.DocString, level: number, syntax: Syntax) {
  const delimiter = syntax === 'markdown' ? '```' : docString.delimiter
  const mediaType = docString.mediaType || ''
  const actualLevel = syntax === 'markdown' ? 1 : level
  const indent = spaces(actualLevel)
  let content = docString.content.replace(/^/gm, indent)
  if (syntax === 'gherkin') {
    if (docString.delimiter === '"""') {
      content = content.replace(/"""/gm, '\\"\\"\\"')
    } else if (docString.delimiter === '```') {
      content = content.replace(/```/gm, '\\`\\`\\`')
    }
  }
  return `${indent}${delimiter}${mediaType}
${content}
${indent}${delimiter}
`
}

function prettyTableRows(
  tableRows: readonly messages.TableRow[],
  level: number,
  syntax: 'markdown' | 'gherkin'
) {
  const maxWidths: number[] = new Array(tableRows[0].cells.length).fill(0)
  tableRows.forEach((tableRow) => {
    tableRow.cells.forEach((tableCell, j) => {
      maxWidths[j] = Math.max(maxWidths[j], escapeCell(tableCell.value).length)
    })
  })

  let n = 0
  let s = ''
  for (const row of tableRows) {
    s += prettyTableRow(row, level, maxWidths, syntax)
    if (n === 0 && syntax === 'markdown') {
      const separatorRow: messages.TableRow = {
        location: row.location,
        id: row.id + '-separator',
        cells: row.cells.map((cell, j) => ({
          location: cell.location,
          value: new Array(maxWidths[j] + 1).join('-'),
        })),
      }
      s += prettyTableRow(separatorRow, level, maxWidths, syntax)
    }
    n++
  }
  return s
}

function prettyTableRow(
  row: messages.TableRow,
  level: number,
  maxWidths: readonly number[],
  syntax: Syntax
): string {
  const actualLevel = syntax === 'markdown' ? 1 : level
  return `${spaces(actualLevel)}| ${row.cells
    .map((cell, j) => {
      const escapedCellValue = escapeCell(cell.value)
      const spaceCount = maxWidths[j] - escapedCellValue.length
      const spaces = new Array(spaceCount + 1).join(' ')
      return isNumeric(escapedCellValue) ? spaces + escapedCellValue : escapedCellValue + spaces
    })
    .join(' | ')} |\n`
}

export function escapeCell(s: string) {
  let e = ''
  const characters = s.split('')
  for (const c of characters) {
    switch (c) {
      case '\\':
        e += '\\\\'
        break
      case '\n':
        e += '\\n'
        break
      case '|':
        e += '\\|'
        break
      default:
        e += c
    }
  }
  return e
}

function isNumeric(s: string) {
  return !isNaN(parseFloat(s))
}

function prettyTags(tags: readonly messages.Tag[], level: number, syntax: Syntax): string {
  if (tags === undefined || tags.length == 0) {
    return ''
  }
  const prefix = syntax === 'gherkin' ? spaces(level) : ''
  const tagQuote = syntax === 'gherkin' ? '' : '`'
  return prefix + tags.map((tag) => `${tagQuote}${tag.name}${tagQuote}`).join(' ') + '\n'
}

function keywordPrefix(level: number, syntax: Syntax): string {
  if (syntax === 'markdown') {
    return new Array(level + 2).join('#') + ' '
  } else {
    return spaces(level)
  }
}

function spaces(level: number): string {
  return new Array(level + 1).join('  ')
}

function stepPrefix(level: number, syntax: Syntax): string {
  if (syntax === 'markdown') {
    return '* '
  } else {
    return new Array(level + 1).join('  ')
  }
}

function formatDescription(description: string, syntax: Syntax): string {
  if (syntax === 'gherkin') return description + '\n'
  else return description.replace(/^\s*/gm, '') + '\n'
}
