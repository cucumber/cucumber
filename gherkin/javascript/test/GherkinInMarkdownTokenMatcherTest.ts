import assert from 'assert'
import GherkinLine from '../src/GherkinLine'
import * as messages from '@cucumber/messages'
import { Token, TokenType } from '../src/Parser'
import GherkinInMarkdownTokenMatcher from '../src/GherkinInMarkdownTokenMatcher'
import ITokenMatcher from '../src/ITokenMatcher'
import { Item } from '../src/IToken'

describe('GherkinInMarkdownTokenMatcher', function () {
  let tm: ITokenMatcher<TokenType>
  let location: messages.Location

  beforeEach(() => {
    tm = new GherkinInMarkdownTokenMatcher('en')
    location = { line: 1, column: 1 }
  })

  it('matches FeatureLine', () => {
    const line = new GherkinLine('## Feature: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
    assert.strictEqual(token.matchedKeyword, 'Feature')
    assert.strictEqual(token.matchedText, 'hello')
  })

  it('matches FeatureLine in French', () => {
    tm = new GherkinInMarkdownTokenMatcher('fr')
    const line = new GherkinLine('## Fonctionnalité: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
    assert.strictEqual(token.matchedKeyword, 'Fonctionnalité')
    assert.strictEqual(token.matchedText, 'hello')
  })

  it('matches bullet Step', () => {
    const line = new GherkinLine('  *  Given I have 3 cukes', location.line)
    const token = new Token(line, location)
    assert(tm.match_StepLine(token))
    assert.strictEqual(token.matchedType, TokenType.StepLine)
    assert.strictEqual(token.matchedKeyword, 'Given ')
    assert.strictEqual(token.matchedText, 'I have 3 cukes')
    assert.strictEqual(token.location.column, 6)
  })

  it('matches plus Step', () => {
    const line = new GherkinLine('  +  Given I have 3 cukes', location.line)
    const token = new Token(line, location)
    assert(tm.match_StepLine(token))
    assert.strictEqual(token.matchedType, TokenType.StepLine)
    assert.strictEqual(token.matchedKeyword, 'Given ')
    assert.strictEqual(token.matchedText, 'I have 3 cukes')
    assert.strictEqual(token.location.column, 6)
  })

  it('matches hyphen Step', () => {
    const line = new GherkinLine('  -  Given I have 3 cukes', location.line)
    const token = new Token(line, location)
    assert(tm.match_StepLine(token))
    assert.strictEqual(token.matchedType, TokenType.StepLine)
    assert.strictEqual(token.matchedKeyword, 'Given ')
    assert.strictEqual(token.matchedText, 'I have 3 cukes')
    assert.strictEqual(token.location.column, 6)
  })

  it('matches arbitrary text as Other', () => {
    const line = new GherkinLine('Whatever', location.line)
    const token = new Token(line, location)
    assert(tm.match_Other(token))
    assert.strictEqual(token.matchedType, TokenType.Other)
  })

  it('matches a non-keyword line as Other', () => {
    const line = new GherkinLine('whatever Given', location.line)
    const token = new Token(line, location)
    assert(tm.match_Other(token))
    assert.strictEqual(token.matchedType, TokenType.Other)
  })

  it('matches a non-keyword bullet line as Other', () => {
    const line = new GherkinLine('* whatever Given', location.line)
    const token = new Token(line, location)
    assert(tm.match_Other(token))
    assert.strictEqual(token.matchedType, TokenType.Other)
  })

  it('matches a non-keyword header line as Other', () => {
    const line = new GherkinLine('## The world is wet', location.line)
    const token = new Token(line, location)
    assert(tm.match_Other(token))
    assert.strictEqual(token.matchedType, TokenType.Other)
  })

  it('matches ``` docstring separator', () => {
    const line = new GherkinLine('  ```somefink', location.line)
    const token = new Token(line, location)
    assert(tm.match_DocStringSeparator(token))
    assert.strictEqual(token.matchedType, TokenType.DocStringSeparator)
    assert.strictEqual(token.matchedKeyword, '```')
    assert.strictEqual(token.matchedText, 'somefink')
  })

  it('matches ```` docstring separator', () => {
    const t1 = new Token(new GherkinLine('  ````', location.line), location)
    assert(tm.match_DocStringSeparator(t1))
    assert.strictEqual(t1.matchedType, TokenType.DocStringSeparator)
    assert.strictEqual(t1.matchedKeyword, '````')
    assert.strictEqual(t1.matchedIndent, 2)
    assert.strictEqual(t1.matchedText, '')

    const t2 = new Token(new GherkinLine('  ```', location.line), location)
    assert(tm.match_Other(t2))
    assert.strictEqual(t2.matchedType, TokenType.Other)
    assert.strictEqual(t2.matchedKeyword, undefined)
    assert.strictEqual(t2.matchedText, '```')

    const t3 = new Token(new GherkinLine('  ````', location.line), location)
    assert(tm.match_DocStringSeparator(t3))
    assert.strictEqual(t3.matchedType, TokenType.DocStringSeparator)
    assert.strictEqual(t3.matchedKeyword, '````')
    assert.strictEqual(t2.matchedIndent, 2)
    assert.strictEqual(t3.matchedText, '')
  })

  it('matches table row indented 2 spaces', () => {
    const t = new Token(new GherkinLine('  |foo|bar|', location.line), location)
    assert(tm.match_TableRow(t))
    assert.strictEqual(t.matchedType, TokenType.TableRow)
    assert.strictEqual(t.matchedKeyword, '|')
    const expectedItems: Item[] = [
      { column: 4, text: 'foo' },
      { column: 8, text: 'bar' },
    ]
    assert.deepStrictEqual(t.matchedItems, expectedItems)
  })

  it('matches table row indented 5 spaces', () => {
    const t = new Token(new GherkinLine('     |foo|bar|', location.line), location)
    assert(tm.match_TableRow(t))
    assert.strictEqual(t.matchedType, TokenType.TableRow)
    assert.strictEqual(t.matchedKeyword, '|')
    const expectedItems: Item[] = [
      { column: 7, text: 'foo' },
      { column: 11, text: 'bar' },
    ]
    assert.deepStrictEqual(t.matchedItems, expectedItems)
  })

  it('does not matche table cells indented 1 space', () => {
    const t = new Token(new GherkinLine(' |foo|bar|', location.line), location)
    assert(!tm.match_TableRow(t))
  })

  it('does not matche table cells indented 6 spaces', () => {
    const t = new Token(new GherkinLine('      |foo|bar|', location.line), location)
    assert(!tm.match_TableRow(t))
  })

  it('matches table separator row as comment', () => {
    assert(tm.match_TableRow(new Token(new GherkinLine('  | h1 | h2 |', location.line), location)))

    const t2 = new Token(new GherkinLine('  | --- | --- |', location.line), location)
    assert(!tm.match_TableRow(t2))
    assert(tm.match_Comment(t2))
  })

  it('matches indented tags', () => {
    const t = new Token(new GherkinLine('  `@foo` `@bar`', location.line), location)
    assert(tm.match_TagLine(t))
    assert.strictEqual(t.matchedType, TokenType.TagLine)
    const expectedItems: Item[] = [
      { column: 4, text: '@foo' },
      { column: 11, text: '@bar' },
    ]
    assert.deepStrictEqual(t.matchedItems, expectedItems)
  })

  it('matches unindented tags', () => {
    const t = new Token(new GherkinLine('`@foo`   `@bar`', location.line), location)
    assert(tm.match_TagLine(t))
    assert.strictEqual(t.matchedType, TokenType.TagLine)
    const expectedItems: Item[] = [
      { column: 2, text: '@foo' },
      { column: 11, text: '@bar' },
    ]
    assert.deepStrictEqual(t.matchedItems, expectedItems)
  })
})
