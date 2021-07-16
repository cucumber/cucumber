import assert from 'assert'
import React from 'react'
import * as messages from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Step } from '../../../src/components/gherkin'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { render } from '../utils'

describe('<Step>', () => {
  it('renders', () => {
    const step: messages.Step = {
      keyword: 'Given',
      text: 'the 48 pixies',
      location: { column: 1, line: 1 },
      id: '123',
    }

    class StubCucumberQuery extends CucumberQuery {
      public getStepMatchArgumentsLists(): messages.StepMatchArgumentsList[] {
        return [
          {
            stepMatchArguments: [
              {
                group: {
                  start: 4,
                  value: '48',
                  children: [],
                },
              },
            ],
          },
        ]
      }
    }

    class StubGherkinQuery extends GherkinQuery {
      getPickleStepIds(): string[] {
        return ['dummy-id']
      }
    }

    const { container } = render(<Step step={step} hasExamples={false} />, {
      gherkinQuery: new StubGherkinQuery(),
      cucumberQuery: new StubCucumberQuery(),
    })

    // TODO a bit dom-specific - can we use snapshots to test this?
    const texts = Array.from(container.querySelectorAll('h3 > *')).map((span) => span.textContent)
    assert.deepStrictEqual(texts, ['Given', 'the 48 pixies'])
  })
})
