import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { EnvelopesQuery, components } from '../../src'

import '../styles/styles.scss'

import attachments from '../../acceptance/attachments/attachments.feature'
import dataTables from '../../acceptance/data-tables/data-tables.feature'
import examplesTables from '../../acceptance/examples-tables/examples-tables.feature'
import hooks from '../../acceptance/hooks/hooks.feature'
import markdown from '../../acceptance/markdown/markdown.feature.md'
import minimal from '../../acceptance/minimal/minimal.feature'
import parameterTypes from '../../acceptance/parameter-types/parameter-types.feature'
import retry from '../../acceptance/retry/retry.feature'
import rules from '../../acceptance/rules/rules.feature'
import stacktTraces from '../../acceptance/stack-traces/stack-traces.feature'
import unknownParameterTypes from '../../acceptance/unknown-parameter-type/unknown-parameter-type.feature'

export default {
  title: 'GherkinDocument',
  component: components.gherkin.GherkinDocument,
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}

type TemplateArgs = {
  envelopes: readonly messages.Envelope[]
}

const Template: Story<TemplateArgs> = ({ envelopes }) => {
  return (
    <components.app.QueriesWrapper {...props(envelopes)}>
      <components.app.GherkinDocumentList />
    </components.app.QueriesWrapper>
  )
}

export const Attachments = Template.bind({})
Attachments.args = {
  envelopes: attachments,
}

export const DataTables = Template.bind({})
DataTables.args = {
  envelopes: dataTables,
}

export const ExamplesTables = Template.bind({})
ExamplesTables.args = {
  envelopes: examplesTables,
}

export const Hooks = Template.bind({})
Hooks.args = {
  envelopes: hooks,
}

export const Markdown = Template.bind({})
Markdown.args = {
  envelopes: markdown,
}

export const Minimal = Template.bind({})
Minimal.args = {
  envelopes: minimal,
}

export const ParameterTypes = Template.bind({})
ParameterTypes.args = {
  envelopes: parameterTypes,
}

export const Retry = Template.bind({})
Retry.args = {
  envelopes: retry,
}

export const Rules = Template.bind({})
Rules.args = {
  envelopes: rules,
}

export const StackTraces = Template.bind({})
StackTraces.args = {
  envelopes: stacktTraces,
}

export const UnknownParameterTypes = Template.bind({})
UnknownParameterTypes.args = {
  envelopes: unknownParameterTypes,
}

function props(envelopes: readonly messages.Envelope[]): Props {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  const envelopesQuery = new EnvelopesQuery()
  for (const envelope of envelopes) {
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
    envelopesQuery.update(envelope)
  }
  return { gherkinQuery, cucumberQuery, envelopesQuery }
}
