import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { HighLight } from '../src/components/app'
import { JSDOM } from 'jsdom'
import SearchQueryContext, { SearchQueryCtx } from '../src/SearchQueryContext'

describe('HighLight', () => {
  function renderHighlight(text: string, query: string, markdown: boolean): Document {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <SearchQueryContext.Provider value={SearchQueryCtx.withDefaults({ query })}>
        <HighLight text={text} markdown={markdown} />
      </SearchQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('puts <mark> around exact matches', () => {
    const document = renderHighlight('Some text with a keyword inside', 'keyword', false)
    const highlighted = Array.from(document.querySelectorAll('#content mark')).map(
      (span) => span.textContent
    )

    assert.deepStrictEqual(highlighted, ['keyword'])
  })

  it('puts <mark> around stemmed query words', () => {
    const document = renderHighlight(
      'This step has failed when a failure occurred (so it fails)',
      'failed',
      false
    )
    const highlighted = Array.from(document.querySelectorAll('#content mark')).map(
      (span) => span.textContent
    )

    // The first one is the exact match.
    // The second one corresponds to the "failure" word, which stem is "fail"
    // The third one corresponds to the "fails" word
    assert.deepStrictEqual(highlighted, ['failed', 'fail', 'fail'])
  })

  it('puts <mark> around multiple words and stems', () => {
    const document = renderHighlight(
      'Given a passed step\nWhen a failed step\nThen a skipped step',
      'step fail pass skipped',
      false
    )
    const highlighted = Array.from(document.querySelectorAll('#content mark')).map(
      (span) => span.textContent
    )

    assert.deepStrictEqual(highlighted, ['pass', 'step', 'fail', 'step', 'skipped', 'step'])
  })

  it('puts <mark> around matches in markdown', () => {
    const document = renderHighlight('* This is\n* a bullet list', 'bullet', true)
    const highlighted = Array.from(document.querySelectorAll('#content mark')).map(
      (span) => span.textContent
    )

    assert.deepStrictEqual(highlighted, ['bullet'])
  })

  it('does not render <script> tags in markdown', () => {
    const document = renderHighlight(
      'Failed XSS: <script>alert("hello")</script>',
      'alert hello',
      true
    )
    const html = document.querySelector('#content').innerHTML
    // Script tags will be removed (rather than escaped). Ideally we'd *escape* them to &lt;script&gt;.
    assert.deepStrictEqual(
      html,
      '<div class="highlight"><p>Failed XSS: ("<mark>hello</mark>")</p></div>'
    )
  })

  it('renders <section> tags in markdown', () => {
    const document = renderHighlight(
      'We *like* other HTML tags:\n\n<section>hello</section>',
      null,
      true
    )
    const html = document.querySelector('#content').innerHTML
    assert.deepStrictEqual(
      html,
      `<div class="highlight"><p>We <em>like</em> other HTML tags:</p>\n<section>hello</section></div>`
    )
  })

  it('does not render JavaScript event handlers on tags in markdown', () => {
    const document = renderHighlight(
      `Failed XSS: <small onclick="alert('hello')" class="supersmall">hello</small>`,
      null,
      true
    )
    const html = document.querySelector('#content').innerHTML
    assert.deepStrictEqual(
      html,
      '<div class="highlight"><p>Failed XSS: <small class="supersmall">hello</small></p></div>'
    )
  })
})
