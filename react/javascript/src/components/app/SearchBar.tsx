import React from 'react'
import { faSearch, faQuestionCircle, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchQueryContext from '../../SearchQueryContext'
import statusName from '../gherkin/statusName'
import statuses from './statuses'
import { TestStepResultStatus as Status } from '@cucumber/messages'

interface IProps {
  statusesWithScenarios: Status[]
}

export const SearchBar: React.FunctionComponent<IProps> = ({ statusesWithScenarios }) => {
  const searchQueryContext = React.useContext(SearchQueryContext)

  const searchSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new window.FormData(event.currentTarget)
    searchQueryContext.update({
      query: formData.get('query').toString(),
    })
  }

  const filterChanged = (name: Status, show: boolean) => {
    searchQueryContext.update({
      hideStatuses: show
        ? searchQueryContext.hideStatuses.filter((s) => s !== name)
        : searchQueryContext.hideStatuses.concat(name),
    })
  }

  const showFilters = statusesWithScenarios.length > 1

  return (
    <div className="cucumber-search-bar">
      <form className="cucumber-search-bar-search" onSubmit={searchSubmitted}>
        <input
          type="text"
          name="query"
          placeholder="Some text or @tags"
          defaultValue={searchQueryContext.query}
        />
        <button type="submit" value="search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <p className="help">
        <FontAwesomeIcon icon={faQuestionCircle} />
        &nbsp; You can use either plain text for the search or &nbsp;
        <a href="https://cucumber.io/docs/cucumber/api/#tag-expressions">
          cucumber tag expressions
        </a>
        &nbsp; to filter the output.
      </p>
      {showFilters && (
        <form className="cucumber-search-bar-filter">
          <span>
            <FontAwesomeIcon icon={faFilter} /> Filter by scenario status:
          </span>
          <ul>
            {statuses.map((status, index) => {
              if (!statusesWithScenarios.includes(status)) {
                return
              }
              const name = statusName(status)
              const enabled = !searchQueryContext.hideStatuses.includes(status)
              const inputId = `filter-status-${name}`

              return (
                <li key={index}>
                  <input
                    id={inputId}
                    type="checkbox"
                    defaultChecked={enabled}
                    onChange={(evt) => filterChanged(status, evt.target.checked)}
                  />
                  <label htmlFor={inputId}>{name}</label>
                </li>
              )
            })}
          </ul>
        </form>
      )}
    </div>
  )
}
