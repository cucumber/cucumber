import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext from '../../SearchQueryContext'

import { SearchBar } from './SearchBar'
import { NoMatchResult } from './NoMatchResult'
import { StatusesSummary } from './StatusesSummary'
import { GherkinDocumentList } from './GherkinDocumentList'

import Search from '../../search/Search'
import filterByStatus from '../../filter/filterByStatus'
import countScenariosByStatuses from '../../countScenariosByStatuses'
import { ExecutionSummary } from './ExecutionSummary'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'
import statuses from './statuses'

export const FilteredResults: React.FunctionComponent = () => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { query, hideStatuses } = React.useContext(SearchQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()

  const scenarioCountByStatus = countScenariosByStatuses(allDocuments, gherkinQuery, cucumberQuery)

  const search = new Search(gherkinQuery)

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const onlyShowStatuses = statuses.filter((s) => !hideStatuses.includes(s))

  const matches = query ? search.search(query) : allDocuments
  const filtered = matches
    .map((document) => filterByStatus(document, gherkinQuery, cucumberQuery, onlyShowStatuses))
    .filter((document) => document !== null)

  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta
  const statusesWithScenarios = [...scenarioCountByStatus.keys()]

  return (
    <div className="cucumber-filtered-results">
      <div className="cucumber-report-header">
        <StatusesSummary scenarioCountByStatus={scenarioCountByStatus} />
        <ExecutionSummary meta={meta} />
        <SearchBar statusesWithScenarios={statusesWithScenarios} />
      </div>
      <GherkinDocumentList gherkinDocuments={filtered} preExpand={true} />
      <NoMatchResult query={query} matches={filtered} />
    </div>
  )
}
