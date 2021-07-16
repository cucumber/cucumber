import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import GherkinDocumentList from '../components/app/GherkinDocumentList'
import QueriesWrapper from '../components/app/QueriesWrapper'
import { EnvelopesQuery } from '../../src'
import GherkinDocument from '../components/gherkin/GherkinDocument'

import '../styles/styles.scss'

import attachments from '../../acceptance/attachments/attachments.feature'
import dataTables from '../../acceptance/data-tables/data-tables.feature'
import examplesTables from '../../acceptance/examples-tables/examples-tables.feature'
import hooks from '../../acceptance/hooks/hooks.feature'
import markdown from '../../acceptance/markdown/markdown.feature.md'
import minimal from '../../acceptance/minimal/minimal.feature'
import parameterTypes from '../../acceptance/parameter-types/parameter-types.feature'
import pending from '../../acceptance/pending/pending.feature'
import retry from '../../acceptance/retry/retry.feature'
import rules from '../../acceptance/rules/rules.feature'
import skipped from '../../acceptance/skipped/skipped.feature'
import stacktTraces from '../../acceptance/stack-traces/stack-traces.feature'
import undefinedEnvelopes from '../../acceptance/undefined/undefined.feature'
import unknownParameterTypes from '../../acceptance/unknown-parameter-type/unknown-parameter-type.feature'

export default {
  title: 'GherkinDocument',
  component: GherkinDocument,
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
    <QueriesWrapper {...props(envelopes)}>
      <GherkinDocumentList />
    </QueriesWrapper>
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

export const Pending = Template.bind({})
Pending.args = {
  envelopes: pending,
}

export const Retry = Template.bind({})
Retry.args = {
  envelopes: retry,
}

export const Rules = Template.bind({})
Rules.args = {
  envelopes: rules,
}

export const Skipped = Template.bind({})
Skipped.args = {
  envelopes: skipped,
}

export const StackTraces = Template.bind({})
StackTraces.args = {
  envelopes: stacktTraces,
}

export const Undefined = Template.bind({})
Undefined.args = {
  envelopes: undefinedEnvelopes,
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
