import * as messages from '@cucumber/messages'
import {
  QueriesWrapper,
  EnvelopesQuery,
  FilteredResults,
  searchFromURLParams,
} from '@cucumber/react'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import React from 'react'
import ReactDOM from 'react-dom'

declare global {
  interface Window {
    CUCUMBER_MESSAGES: messages.Envelope[]
  }
}

const gherkinQuery = new GherkinQuery()
const cucumberQuery = new CucumberQuery()
const envelopesQuery = new EnvelopesQuery()

for (const envelope of window.CUCUMBER_MESSAGES as messages.Envelope[]) {
  gherkinQuery.update(envelope)
  cucumberQuery.update(envelope)
  envelopesQuery.update(envelope)
}

const searchFromUrl = searchFromURLParams()

const app = (
  <QueriesWrapper
    gherkinQuery={gherkinQuery}
    cucumberQuery={cucumberQuery}
    envelopesQuery={envelopesQuery}
    {...searchFromUrl.searchQuery}
  >
    <FilteredResults renderSearchURL={searchFromUrl.renderSearchURL} />
  </QueriesWrapper>
)

ReactDOM.render(app, document.getElementById('content'))
