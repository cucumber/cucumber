import { gherkinMessages, streamToArray } from './TestHelpers'
import * as messages from '@cucumber/messages'
import { EnvelopeListener, RunOptions } from '../src/types'
import assert from 'assert'
import TestPlan from '../src/TestPlan'
import { Query } from '@cucumber/gherkin-utils'
import IncrementClock from '../src/IncrementClock'
import { withSourceFramesOnlyStackTrace } from '../src/ErrorMessageGenerator'
import SupportCode from '../src/SupportCode'
import makeTestCase from '../src/makeTestCase'
import makePickleTestStep from '../src/makePickleTestStep'
import makeHookTestStep from '../src/makeHookTestStep'
import IncrementStopwatch from '../src/IncrementStopwatch'

const defaultRunOptions: RunOptions = { allowedRetries: 0 }

describe('TestPlan', () => {
  let supportCode: SupportCode
  beforeEach(() => {
    supportCode = new SupportCode(
      messages.IdGenerator.incrementing(),
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )
  })

  it('executes test cases', async () => {
    supportCode.defineStepDefinition(null, 'a passed step', () => undefined)

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode, defaultRunOptions)
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope) => {
      if (!envelope) throw new Error('Envelope was null or undefined')
      envelopes.push(envelope)
    }
    await testPlan.execute(listener)
    const testStepFinisheds = extractEnvelopes(envelopes, (e) => e.testStepFinished)
    assert.deepStrictEqual(testStepFinisheds.length, 1)
    assert.strictEqual(testStepFinisheds[0].testStepResult.status, 'PASSED')
  })

  it('executes test cases multiple times with retry', async () => {
    let ran = false
    supportCode.defineStepDefinition(null, 'a sometimes-failing step', () => {
      if (!ran) {
        ran = true
        throw new Error('fail')
      }
    })

    const gherkinSource = `Feature: test
  Scenario: test
    Given a sometimes-failing step
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode, { allowedRetries: 1 })
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope) => {
      if (!envelope) throw new Error('Envelope was null or undefined')
      envelopes.push(envelope)
    }
    await testPlan.execute(listener)
    extractEnvelopes(envelopes, (e) => e.testCaseStarted)
    const testCaseStarteds = extractEnvelopes(envelopes, (e) => e.testCaseStarted)
    assert.deepStrictEqual(testCaseStarteds.length, 2)
    assert.strictEqual(testCaseStarteds[0].attempt, 0)
    assert.strictEqual(testCaseStarteds[1].attempt, 1)
    const testCaseFinisheds = extractEnvelopes(envelopes, (e) => e.testCaseFinished)
    assert.strictEqual(testCaseFinisheds.length, 2)
    assert.strictEqual(testCaseFinisheds[0].willBeRetried, true)
    assert.strictEqual(testCaseFinisheds[1].willBeRetried, false)
    const testStepFinisheds = extractEnvelopes(envelopes, (e) => e.testStepFinished)
    assert.deepStrictEqual(testStepFinisheds.length, 2)
    assert.strictEqual(testStepFinisheds[0].testStepResult.status, 'FAILED')
    assert.strictEqual(testStepFinisheds[1].testStepResult.status, 'PASSED')
  })

  it('executes test cases once if passing first time with retry', async () => {
    supportCode.defineStepDefinition(null, 'a passed step', () => undefined)

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode, { allowedRetries: 1 })
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope) => {
      if (!envelope) throw new Error('Envelope was null or undefined')
      envelopes.push(envelope)
    }
    await testPlan.execute(listener)
    const testStepFinisheds = extractEnvelopes(envelopes, (e) => e.testStepFinished)
    assert.strictEqual(
      envelopes.find((e) => e.testCaseFinished).testCaseFinished.willBeRetried,
      false
    )
    assert.deepStrictEqual(testStepFinisheds.length, 1)
    assert.strictEqual(testStepFinisheds[0].testStepResult.status, 'PASSED')
  })

  it('executes test cases once if undefined first time with retry', async () => {
    const gherkinSource = `Feature: test
  Scenario: test
    Given a step we think exists
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode, { allowedRetries: 1 })
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope) => {
      if (!envelope) throw new Error('Envelope was null or undefined')
      envelopes.push(envelope)
    }
    await testPlan.execute(listener)
    const testStepFinisheds = extractEnvelopes(envelopes, (e) => e.testStepFinished)
    assert.strictEqual(
      envelopes.find((e) => e.testCaseFinished).testCaseFinished.willBeRetried,
      false
    )
    assert.deepStrictEqual(testStepFinisheds.length, 1)
    assert.strictEqual(testStepFinisheds[0].testStepResult.status, 'UNDEFINED')
  })

  class Flight {
    constructor(public readonly name: string) {}
  }

  it('defines parameter types', async () => {
    supportCode.defineParameterType({
      name: 'flight',
      regexp: /[A-Z]{3}-[A-Z]{3}/,
      transformer(name) {
        return new Flight(name)
      },
    })

    supportCode.defineStepDefinition(null, 'flight {flight}', (flight: Flight) =>
      assert.strictEqual(flight.name, 'LHR-CDG')
    )

    const gherkinSource = `Feature: test
  Scenario: test
    Given flight LHR-CDG
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode, defaultRunOptions)
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope) => envelopes.push(envelope)
    await testPlan.execute(listener)
    const testStepFinisheds = extractEnvelopes(envelopes, (e) => e.testStepFinished)
    assert.deepStrictEqual(testStepFinisheds.length, 1)
    assert.strictEqual(testStepFinisheds[0].testStepResult.status, 'PASSED')
    const parameterTypes = envelopes.filter((m) => m.parameterType).map((m) => m.parameterType)
    assert.deepStrictEqual(parameterTypes.length, 1)
    assert.strictEqual(parameterTypes[0].name, 'flight')
  })

  it('attaches text attachments', async () => {
    supportCode.defineStepDefinition(null, 'a passed step', function () {
      this.attach('hello world', 'text/plain')
    })

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode, defaultRunOptions)
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope) => envelopes.push(envelope)
    await testPlan.execute(listener)

    const attachments = envelopes.filter((m) => m.attachment).map((m) => m.attachment)
    assert.deepStrictEqual(attachments.length, 1)
    assert.strictEqual(attachments[0].body, 'hello world')
  })
})

async function makeTestPlan(
  gherkinSource: string,
  supportCode: SupportCode,
  runOptions: RunOptions
): Promise<TestPlan> {
  const gherkinEnvelopes = await streamToArray(gherkinMessages(gherkinSource, 'test.feature'))
  const gherkinQuery = new Query()
  for (const gherkinEnvelope of gherkinEnvelopes) {
    gherkinQuery.update(gherkinEnvelope)
  }

  const testCases = gherkinQuery
    .getPickles()
    .map((pickle) =>
      makeTestCase(
        pickle,
        supportCode.stepDefinitions,
        supportCode.beforeHooks,
        supportCode.afterHooks,
        gherkinQuery,
        supportCode.newId,
        supportCode.clock,
        supportCode.stopwatch,
        supportCode.makeErrorMessage,
        makePickleTestStep,
        makeHookTestStep
      )
    )

  return new TestPlan(testCases, supportCode, runOptions)
}

function extractEnvelopes<M>(
  envelopes: messages.Envelope[],
  mapper: (e: messages.Envelope) => M
): M[] {
  return envelopes.filter(mapper).map(mapper)
}
