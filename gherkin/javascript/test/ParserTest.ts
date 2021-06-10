import assert from 'assert'
import * as messages from '@cucumber/messages'
import AstBuilder from '../src/AstBuilder'
import Parser from '../src/Parser'
import GherkinClassicTokenMatcher from '../src/GherkinClassicTokenMatcher'
import AstNode from '../src/AstNode'
import generateMessages from '../src/generateMessages'
import GherkinInMarkdownTokenMatcher from '../src/GherkinInMarkdownTokenMatcher'

describe('Parser', function () {
  describe('with Gherkin Classic', () => {
    let parser: Parser<AstNode>
    beforeEach(
      () =>
        (parser = new Parser<AstNode>(
          new AstBuilder(messages.IdGenerator.incrementing()),
          new GherkinClassicTokenMatcher()
        ))
    )

    it('parses a simple feature', function () {
      const ast = parser.parse('Feature: hello')
      const gherkinDocument: messages.GherkinDocument = {
        feature: {
          description: '',
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          children: [],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast, gherkinDocument)
    })

    it('parses multiple features', function () {
      const ast1 = parser.parse('Feature: hello')
      const ast2 = parser.parse('Feature: hello again')

      const gherkinDocument1: messages.GherkinDocument = {
        feature: {
          tags: [],
          description: '',
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          children: [],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast1, gherkinDocument1)
      const gherkinDocument2: messages.GherkinDocument = {
        feature: {
          tags: [],
          description: '',
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello again',
          children: [],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast2, gherkinDocument2)
    })

    it('parses a feature description', function () {
      const ast = parser.parse(`Feature: hello
  This is the
  description
`)

      const gherkinDocument: messages.GherkinDocument = {
        feature: {
          tags: [],
          description: '  This is the\n  description',
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          children: [],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast, gherkinDocument)
    })

    it('parses feature after parse error', function () {
      let ast: messages.GherkinDocument
      try {
        parser.parse(
          '# a comment\n' +
            'Feature: Foo\n' +
            '  Scenario: Bar\n' +
            '    Given x\n' +
            '      ```\n' +
            '      unclosed docstring\n'
        )
      } catch (expected) {
        ast = parser.parse(
          'Feature: Foo\n' +
            '  Scenario: Bar\n' +
            '    Given x\n' +
            '      """\n' +
            '      closed docstring\n' +
            '      """'
        )
      }

      const gherkinDocument: messages.GherkinDocument = {
        feature: {
          tags: [],
          description: '',
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'Foo',
          children: [
            {
              scenario: {
                id: '1',
                description: '',
                examples: [],
                keyword: 'Scenario',
                location: { line: 2, column: 3 },
                name: 'Bar',
                steps: [
                  {
                    id: '0',
                    dataTable: undefined,
                    docString: {
                      content: 'closed docstring',
                      delimiter: '"""',
                      location: { line: 4, column: 7 },
                    },
                    keyword: 'Given ',
                    location: { line: 3, column: 5 },
                    text: 'x',
                  },
                ],
                tags: [],
              },
            },
          ],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast, gherkinDocument)
    })

    it('interpolates data tables', function () {
      const envelopes = generateMessages(
        'Feature: Foo\n' +
          '  Scenario Outline: Parenthesis\n' +
          '    Given the thing <is (not) triggered> and has <value>\n' +
          '  Examples:\n' +
          '    | is (not) triggered | value |\n' +
          '    | is triggered       | foo   |\n ',
        '',
        messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
        { includePickles: true, newId: messages.IdGenerator.incrementing() }
      )

      const pickle = envelopes.find((envelope) => envelope.pickle).pickle

      assert.strictEqual(pickle.steps[0].text, 'the thing is triggered and has foo')
    })

    it('can change the default language', function () {
      const matcher = new GherkinClassicTokenMatcher('no')
      const parser = new Parser(new AstBuilder(messages.IdGenerator.incrementing()), matcher)
      const ast = parser.parse('Egenskap: i18n support')
      const gherkinDocument: messages.GherkinDocument = {
        feature: {
          tags: [],
          description: '',
          location: { line: 1, column: 1 },
          language: 'no',
          keyword: 'Egenskap',
          name: 'i18n support',
          children: [],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast, gherkinDocument)
    })
  })

  describe('with Gherkin In Markdown', () => {
    let parser: Parser<AstNode>
    beforeEach(
      () =>
        (parser = new Parser<AstNode>(
          new AstBuilder(messages.IdGenerator.incrementing()),
          new GherkinInMarkdownTokenMatcher()
        ))
    )

    it('does not parse a feature description', function () {
      const ast = parser.parse(`# Feature: hello
This is the
description
`)

      const gherkinDocument: messages.GherkinDocument = {
        feature: {
          tags: [],
          description: '',
          location: { line: 1, column: 3 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          children: [],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast, gherkinDocument)
    })

    it('parses a feature without a # Feature header', function () {
      const ast = parser.parse(`# Hello
This is the
description

## Scenario: hello
+ Given a step

## Some other header
`)

      const gherkinDocument: messages.GherkinDocument = {
        feature: {
          tags: [],
          location: {
            line: 1,
            column: 1,
          },
          language: 'en',
          keyword: undefined,
          name: '# Hello',
          description: '',
          children: [
            {
              scenario: {
                id: '1',
                tags: [],
                location: {
                  line: 5,
                  column: 4,
                },
                keyword: 'Scenario',
                name: 'hello',
                description: '',
                steps: [
                  {
                    id: '0',
                    location: {
                      line: 6,
                      column: 3,
                    },
                    keyword: 'Given ',
                    text: 'a step',
                    dataTable: undefined,
                    docString: undefined,
                  },
                ],
                examples: [],
              },
            },
          ],
        },
        comments: [],
      }
      assert.deepStrictEqual(ast, gherkinDocument)
    })

    it('parses DocString', function () {
      const markdown = `
# Feature: DocString variations
## Scenario: minimalistic
* And a DocString with an escaped alternative separator inside
  \`\`\`\`
  \`\`\`what
  \`\`\`\`
`
      const envelopes = generateMessages(
        markdown,
        'test.md',
        messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_MARKDOWN,
        {
          includePickles: true,
          includeGherkinDocument: true,
          newId: messages.IdGenerator.incrementing(),
        }
      )

      const pickle = envelopes.find((envelope) => envelope.pickle).pickle

      assert.strictEqual(
        pickle.steps[0].text,
        'a DocString with an escaped alternative separator inside'
      )

      assert.strictEqual(pickle.steps[0].argument.docString.content, '```what')
    })
  })
})
