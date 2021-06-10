import * as messages from '@cucumber/messages'
import {AstBuilder, GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher, Parser,} from '@cucumber/gherkin'
import pretty, {Syntax} from '../pretty'
import {readFile as readFileCb, unlink as unlinkCb, writeFile as writeFileCb} from 'fs'
import {promisify} from 'util'
import path from 'path'
import fg from 'fast-glob'
import isGlob from 'is-glob'
import micromatch from 'micromatch'

const readFile = promisify(readFileCb)
const writeFile = promisify(writeFileCb)
const unlink = promisify(unlinkCb)

type Options = {
  move: boolean
}

export default async (from: string, to: string | undefined, options: Partial<Options> = {}) => {
  if (!to) {
    to = from
  }
  const fromPaths = await fg(from)
  for (const fromPath of fromPaths) {
    let gherkinDocument: messages.GherkinDocument
    try {
      gherkinDocument = await parseFile(fromPath)
    } catch (err) {
      console.error(`Failed to parse ${fromPath}`)
      console.error(err.message)
      process.exit(1)
    }

    const toPath = makeToPath(fromPath, from, to)
    const destinationSyntax: Syntax = getSyntax(toPath)
    const toSource = pretty(gherkinDocument, destinationSyntax)
    try {
      // Sanity check that what we generated is OK
      makeParser(destinationSyntax).parse(toSource)
    } catch (err) {
      console.error(`Failed to generate ${fromPath} because the generated source is not valid.`)
      console.error(`Please report a bug at https://github.com/cucumber/common/issues/new`)
      console.error(err.message)
      console.error(`--- Generated ${destinationSyntax} source ---`)
      console.error(toSource)
      process.exit(2)
    }
    await writeFile(toPath, toSource, 'utf-8')
    if (options.move && toPath !== fromPath) {
      await unlink(fromPath)
    }
  }
}

export function makeToPath(fromPath: string, from: string, to: string): string {
  if (!isGlob(to)) {
    return to
  }
  const fromMatches = micromatch.capture(from, fromPath)
  return to.replace(/\*\*?/g, () => fromMatches.shift())
}

async function parseFile(fromPath: string) {
  const fromParser = makeParser(getSyntax(fromPath))
  const fromSource = await readFile(fromPath, 'utf-8')
  const gherkinDocument = fromParser.parse(fromSource)
  gherkinDocument.uri = fromPath
  return gherkinDocument;
}


function getSyntax(fromPath: string) {
  return path.extname(fromPath) === '.feature' ? 'gherkin' : 'markdown';
}

function makeParser(sourceSyntax: "markdown" | "gherkin") {
  return new Parser(
    new AstBuilder(messages.IdGenerator.uuid()),
    sourceSyntax === 'gherkin'
      ? new GherkinClassicTokenMatcher()
      : new GherkinInMarkdownTokenMatcher()
  );
}
