import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext, { SearchQueryProps, useSearchQueryCtx } from '../../SearchQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import EnvelopesQueryContext, { EnvelopesQuery } from '../../EnvelopesQueryContext'

// temporary until we get all(?) styles into css modules
import '../../styles/styles.scss'

interface IProps extends SearchQueryProps {
  cucumberQuery: CucumberQuery
  gherkinQuery: GherkinQuery
  envelopesQuery: EnvelopesQuery
}

export const QueriesWrapper: React.FunctionComponent<IProps> = (props) => (
  <div className="cucumber-react">
    <CucumberQueryContext.Provider value={props.cucumberQuery}>
      <GherkinQueryContext.Provider value={props.gherkinQuery}>
        <SearchQueryContext.Provider value={useSearchQueryCtx(props)}>
          <EnvelopesQueryContext.Provider value={props.envelopesQuery}>
            {props.children}
          </EnvelopesQueryContext.Provider>
        </SearchQueryContext.Provider>
      </GherkinQueryContext.Provider>
    </CucumberQueryContext.Provider>
  </div>
)
