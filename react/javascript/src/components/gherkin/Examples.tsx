import React from 'react'
import { Keyword } from './Keyword'
import { ExamplesTable } from './ExamplesTable'
import { Description } from './Description'
import { Title } from './Title'
import { Tags } from './Tags'
import * as messages from '@cucumber/messages'
import { Children } from './Children'

interface IExamplesProps {
  examples: messages.Examples
}

export const Examples: React.FunctionComponent<IExamplesProps> = ({ examples }) => {
  return (
    <section>
      <Tags tags={examples.tags} />
      <Title header="h2" id={examples.id}>
        <Keyword>{examples.keyword}:</Keyword>
        <span>{examples.name}</span>
      </Title>
      <Description description={examples.description} />
      {examples.tableHeader && (
        <Children>
          <ExamplesTable tableHeader={examples.tableHeader} tableBody={examples.tableBody} />
        </Children>
      )}
    </section>
  )
}
