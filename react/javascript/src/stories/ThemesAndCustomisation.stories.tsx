import React from 'react'
import { Meta, Story } from '@storybook/react'

import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'

import '../styles/styles.scss'
import './custom-classes.scss'

import attachments from '../../acceptance/attachments/attachments.feature'
import rules from '../../acceptance/rules/rules.feature'

import { components, EnvelopesQuery } from '..'
import { CustomRenderingSupport } from '../components/customise'

const { DocString, Tags } = components.gherkin

export default {
  title: 'Themes & Customisation',
  component: components.customise.CustomRendering,
} as Meta

type Props = {
  gherkinQuery: GherkinQuery
  cucumberQuery: CucumberQuery
  envelopesQuery: EnvelopesQuery
}

export const Themes: Story<{envelopes: messages.Envelope[], theme: string}> = ({ envelopes, theme }) => {
  return (
    <>
      <h2>Dark Theme</h2>
      <components.customise.Theme theme={theme}>
        <components.app.QueriesWrapper {...props(envelopes)}>
          <components.app.GherkinDocumentList />
        </components.app.QueriesWrapper>
      </components.customise.Theme>
    </>
  )
}
Themes.args = {
  envelopes: [...attachments as messages.Envelope[], ...rules as messages.Envelope[]],
  theme: 'dark',
}

export const Classes: Story<{support: CustomRenderingSupport, docString: messages.DocString}> = ({ support, docString }) => {
  return (
    <>
      <h2>Default DocString:</h2>
      <components.gherkin.DocString docString={docString} />
      <h2>With Custom Classes:</h2>
      <components.customise.CustomRendering support={support}>
        <DocString docString={docString} />
      </components.customise.CustomRendering>
    </>
  )
}
Classes.args = {
  docString: {
    location: {
      column: 1,
      line: 1,
    },
    content: "Hello world, I'm a doc string!",
    delimiter: '`',
  },
  support: {
    DocString: {
      docString: 'custom-docstring',
    },
  },
}

export const CustomTagComponent: Story<{support: CustomRenderingSupport, tags: messages.Tag[]}> = ({ support, tags }) => {
  return (
    <>
      <h2>Tags with JIRA linking</h2>
      <components.customise.CustomRendering support={support}>
        <Tags tags={tags} />
      </components.customise.CustomRendering>
    </>
  )
}

CustomTagComponent.args = {
  tags: [
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@foo',
      id: '1'
    },
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@bar',
      id: '1'
    },
    {
      location: {
        column: 1,
        line: 1,
      },
      name: '@PRODUCT-12345',
      id: '1'
    },
  ],
  support: {
    // eslint-disable-next-line react/display-name
    Tags: (props: components.customise.TagsProps) => (
      <ul>
        {props.tags.map((tag, i) => {
          if (tag.name.match(/^@[A-Z]+-[0-9]+$/)) {
            return (
              <li key={i}>
                <a href={`https://jira.fake.co/${tag.name.substr(1)}`}>{tag.name}</a>
              </li>
            )
          }
          return <li key={i}>{tag.name}</li>
        })}
      </ul>
    ),
  },
}

export const CustomFeatureComponent: Story<{support: CustomRenderingSupport, feature: messages.Feature}> = ({ support, feature }) => {
  return (
    <>
      <h2>Feature with button on top</h2>
      <components.customise.CustomRendering support={support}>
        <components.gherkin.Feature feature={feature} />
      </components.customise.CustomRendering>
    </>
  )
}

CustomFeatureComponent.args = {
  feature: {
    keyword: 'Feature',
    name: 'My feature',
    children: [],
    tags: [],
    location: {
      column: 1,
      line: 1,
    },
    description: 'This\nis\nthe\ndescription',
    language: 'en',
  },
  support: {
    // eslint-disable-next-line react/display-name
    Feature: (props) => (
      <div>
        <button>Click me</button>
        <props.DefaultRenderer {...props} />
      </div>
    ),
  },
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
