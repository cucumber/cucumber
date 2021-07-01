import assert from 'assert'
import * as messages from '@cucumber/messages'
import makeTestCase from '../src/makeTestCase'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import Hook from '../src/Hook'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import IncrementClock from '../src/IncrementClock'
import { withSourceFramesOnlyStackTrace } from '../src/ErrorMessageGenerator'
import { EnvelopeListener } from '../src/types'
import makePickleTestStep from '../src/makePickleTestStep'
import makeHookTestStep from '../src/makeHookTestStep'
import IncrementStopwatch from '../src/IncrementStopwatch'

describe('makeTestCase', () => {
  it('transforms a Pickle to a TestCase', () => {
    const pickle = makePickleWithTwoSteps()
    const stepDefinitions = makeStepDefinitions()
    const testCase = makeTestCase(
      pickle,
      stepDefinitions,
      [],
      [],
      new GherkinQuery(),
      messages.IdGenerator.incrementing(),
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace(),
      makePickleTestStep,
      makeHookTestStep
    )

    assert.deepStrictEqual(
      testCase.toMessage().testCase.testSteps.map((s) => s.pickleStepId),
      ['step-1', 'step-2']
    )
  })

  context('when the pickle has no steps', () => {
    it('generates a testCase without any steps', async () => {
      // See https://github.com/cucumber/cucumber/issues/249
      const pickle: messages.Pickle = {
        id: 'some-id',
        name: 'some name',
        steps: [],
        astNodeIds: [],
        tags: [],
        language: 'en',
        uri: 'uri',
      }
      const testCase = makeTestCase(
        pickle,
        [],
        [],
        [],
        new GherkinQuery(),
        messages.IdGenerator.incrementing(),
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace(),
        makePickleTestStep,
        makeHookTestStep
      )

      const messageList: messages.Envelope[] = []
      const listener: EnvelopeListener = (message: messages.Envelope) => messageList.push(message)
      await testCase.execute(listener, 0, 'some-test-case-started-id')
      assert.strictEqual(messageList.length, 2)
    })
  })

  context('when hooks are defined', () => {
    context('when a before hook matches', () => {
      it('adds a step before the scenario ones', () => {
        const beforeHooks = [new Hook('hook-id', null, null, () => null)]
        const pickle = makePickleWithTwoSteps()
        const stepDefinitions = makeStepDefinitions()
        const testCase = makeTestCase(
          pickle,
          stepDefinitions,
          beforeHooks,
          [],
          new GherkinQuery(),
          messages.IdGenerator.incrementing(),
          new IncrementClock(),
          new IncrementStopwatch(),
          withSourceFramesOnlyStackTrace(),
          makePickleTestStep,
          makeHookTestStep
        )

        assert.deepStrictEqual(
          testCase.toMessage().testCase.testSteps.map((s) => s.pickleStepId),
          [undefined, 'step-1', 'step-2']
        )
        assert.strictEqual(
          testCase.toMessage().testCase.testSteps[0].hookId,
          beforeHooks[0].toMessage().hook.id
        )
      })
    })
  })

  context('when an after hook matches', () => {
    it('adds a step after the scenario ones', () => {
      const afterHooks = [new Hook('hook-id', null, null, () => null)]
      const pickle = makePickleWithTwoSteps()
      const stepDefinitions = makeStepDefinitions()
      const testCase = makeTestCase(
        pickle,
        stepDefinitions,
        [],
        afterHooks,
        new GherkinQuery(),
        messages.IdGenerator.incrementing(),
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace(),
        makePickleTestStep,
        makeHookTestStep
      )

      assert.deepStrictEqual(
        testCase.toMessage().testCase.testSteps.map((s) => s.pickleStepId),
        ['step-1', 'step-2', undefined]
      )
      assert.strictEqual(
        testCase.toMessage().testCase.testSteps[2].hookId,
        afterHooks[0].toMessage().hook.id
      )
    })
  })

  function makePickleWithTwoSteps(): messages.Pickle {
    return {
      id: 'some-id',
      name: 'some name',
      steps: [
        {
          id: 'step-1',
          text: 'a passed step',
          astNodeIds: [],
        },
        {
          id: 'step-2',
          text: 'a failed step',
          astNodeIds: [],
        },
      ],
      astNodeIds: [],
      tags: [],
      language: 'en',
      uri: 'uri',
    }
  }

  function makeStepDefinitions() {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    return [
      new ExpressionStepDefinition(
        'hook-id',
        new CucumberExpression('a passed {word}', parameterTypeRegistry),
        null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (thing: string) => undefined
      ),
      new ExpressionStepDefinition(
        'hook-id',
        new CucumberExpression('a failed {word}', parameterTypeRegistry),
        null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (thing: string) => undefined
      ),
    ]
  }
})
