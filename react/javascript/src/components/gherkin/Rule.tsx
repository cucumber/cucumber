import React from 'react'
import { Description } from './Description'
import { Background } from './Background'
import { Children } from './Children'
import { Keyword } from './Keyword'
import { Scenario } from './Scenario'
import { Tags } from './Tags'
import { Title } from './Title'
import * as messages from '@cucumber/messages'
import { HighLight } from '../app'

interface IProps {
  rule: messages.Rule
}

export const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  return (
    <section>
      <Tags tags={rule.tags} />
      <Title header="h2" id={rule.id}>
        <Keyword>{rule.keyword}:</Keyword>
        <HighLight text={rule.name} />
      </Title>
      <Description description={rule.description} />
      <Children>
        {(rule.children || []).map((child, index) => {
          if (child.background) {
            return <Background key={index} background={child.background} />
          } else if (child.scenario) {
            return <Scenario key={index} scenario={child.scenario} />
          } else {
            throw new Error('Expected background or scenario')
          }
        })}
      </Children>
    </section>
  )
}
