import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { SearchBar } from '../src/components/app'
import { JSDOM } from 'jsdom'
import SearchQueryContext, {
  SearchQueryProps,
  SearchQueryCtx,
  SearchQuery,
} from '../src/SearchQueryContext'
import { TestStepResultStatus as Status } from '@cucumber/messages'
import sinon from 'sinon'

describe('SearchBar', () => {
  function renderSearchBar(
    searchQuery: SearchQueryProps = {},
    setSearchQuery?: (searchQuery: SearchQuery) => void
  ): Document {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const statusesWithScenarios: Status[] = []

    const app = (
      <SearchQueryContext.Provider value={SearchQueryCtx.withDefaults(searchQuery, setSearchQuery)}>
        <SearchBar statusesWithScenarios={statusesWithScenarios} />
      </SearchQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('puts the context query as the initial search text', () => {
    const document = renderSearchBar({ query: 'keyword' })
    const searchTextElems = document.getElementsByName('query')

    assert.strictEqual(searchTextElems.length, 1)

    const searchTextElem = searchTextElems[0] as HTMLInputElement
    assert.strictEqual(searchTextElem.value, 'keyword')
  })

  it('updates the context when the form is submitted', () => {
    const onSearchQueryUpdated = sinon.spy()

    const document = renderSearchBar({}, onSearchQueryUpdated)

    const searchTextElem = document.getElementsByName('query')[0] as HTMLInputElement
    searchTextElem.value = 'search text'

    const searchForm = document.querySelector('.cucumber-search-bar-search') as HTMLFormElement
    searchForm.submit()

    sinon.assert.calledOnce(onSearchQueryUpdated)
    sinon.assert.calledWith(
      onSearchQueryUpdated,
      sinon.match({
        query: 'search text',
      })
    )
  })

  it('updates the context when the search button is clicked', () => {
    const onSearchQueryUpdated = sinon.spy()

    const document = renderSearchBar({}, onSearchQueryUpdated)

    const searchTextElem = document.getElementsByName('query')[0] as HTMLInputElement
    searchTextElem.value = 'search text'

    const searchButton = document.querySelector(
      '.cucumber-search-bar-search button'
    ) as HTMLButtonElement
    searchButton.click()

    sinon.assert.calledOnce(onSearchQueryUpdated)
    sinon.assert.calledWith(
      onSearchQueryUpdated,
      sinon.match({
        query: 'search text',
      })
    )
  })

  it("doesn't perform the default form action when submitting", () => {
    const document = renderSearchBar({ query: 'keyword' })

    const eventListener = sinon.spy()
    document.addEventListener('submit', eventListener)

    const searchForm = document.querySelector('.cucumber-search-bar-search') as HTMLFormElement
    searchForm.submit()

    sinon.assert.calledOnce(eventListener)
    sinon.assert.calledWith(
      eventListener,
      sinon.match({
        defaultPrevented: true,
      })
    )
  })

  it('updates the context when a blank search is submitted', () => {
    const onSearchQueryUpdated = sinon.spy()

    const document = renderSearchBar({ query: 'foo' }, onSearchQueryUpdated)

    const searchTextElem = document.getElementsByName('query')[0] as HTMLInputElement
    searchTextElem.value = ''

    const searchForm = document.querySelector('.cucumber-search-bar-search') as HTMLFormElement
    searchForm.submit()

    sinon.assert.calledOnce(onSearchQueryUpdated)
    sinon.assert.calledWith(
      onSearchQueryUpdated,
      sinon.match({
        query: '',
      })
    )
  })
})
