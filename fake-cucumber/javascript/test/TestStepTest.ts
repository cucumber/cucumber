import assert from 'assert'
import * as messages from '@cucumber/messages'
import makePickleTestStep from '../src/makePickleTestStep'
import TestWorld from './TestWorld'
import IncrementClock from '../src/IncrementClock'
import {
  withSourceFramesOnlyStackTrace,
  withFullStackTrace,
  IWorld,
  makeHookTestStep,
} from '../src'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import IncrementStopwatch from '../src/IncrementStopwatch'
import { ITestStep } from '../src/types'
import Hook from '../src/Hook'
import { Query } from '@cucumber/gherkin-utils'
import { TimeConversion } from '@cucumber/messages'

describe('TestStep', () => {
  let world: IWorld
  let undefinedPickleTestStep: ITestStep
  let ambiguousPickleTestStep: ITestStep
  let passedPickleTestStep: ITestStep
  let failedPickleTestStep: ITestStep
  let pendingPickleTestStep: ITestStep
  let skippedPickleTestStep: ITestStep
  let failedHookTestStep: ITestStep
  beforeEach(() => {
    world = new TestWorld()

    const passedStepDefinition = new ExpressionStepDefinition(
      'an-id',
      new CucumberExpression('a passed step', new ParameterTypeRegistry()),
      null,
      () => undefined
    )

    const pendingStepDefinition = new ExpressionStepDefinition(
      'an-id',
      new CucumberExpression('a pending step', new ParameterTypeRegistry()),
      null,
      () => 'pending'
    )

    const skippedStepDefinition = new ExpressionStepDefinition(
      'an-id',
      new CucumberExpression('a skipped step', new ParameterTypeRegistry()),
      null,
      () => 'skipped'
    )

    const failedStepDefinition = new ExpressionStepDefinition(
      'an-id',
      new CucumberExpression('a failed step', new ParameterTypeRegistry()),
      null,
      () => {
        throw new Error('Should now be run')
      }
    )

    undefinedPickleTestStep = makePickleTestStep(
      'some-test-step-id',
      {
        text: 'an undefined step',
        astNodeIds: [],
        id: '1',
      },
      [],
      ['undefined.feature:123'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )

    ambiguousPickleTestStep = makePickleTestStep(
      'some-test-step-id',
      {
        text: 'a failed step',
        astNodeIds: [],
        id: '1',
      },
      [failedStepDefinition, failedStepDefinition],
      ['ambiguous.feature:123'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )

    failedPickleTestStep = makePickleTestStep(
      'some-test-step-id',
      {
        text: 'a failed step',
        astNodeIds: [],
        id: '1',
      },
      [failedStepDefinition],
      ['failed.feature:234'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withFullStackTrace()
    )

    passedPickleTestStep = makePickleTestStep(
      'some-test-step-id',
      {
        text: 'a passed step',
        astNodeIds: [],
        id: '1',
      },
      [passedStepDefinition],
      ['passed.feature:234'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )

    pendingPickleTestStep = makePickleTestStep(
      'some-test-step-id',
      {
        text: 'a pending step',
        astNodeIds: [],
        id: '1',
      },
      [pendingStepDefinition],
      ['pending.feature:234'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )

    skippedPickleTestStep = makePickleTestStep(
      'some-test-step-id',
      {
        text: 'a skipped step',
        astNodeIds: [],
        id: '1',
      },
      [skippedStepDefinition],
      ['skipped.feature:234'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )

    const hook = new Hook('hook-id', null, { uri: 'hook.ts' }, () => {
      throw new Error()
    })
    failedHookTestStep = makeHookTestStep(
      {
        name: 'hello',
        steps: [],
        id: 'pickle-id',
        language: 'en',
        uri: 'test.feature',
        astNodeIds: [],
        tags: [],
      },
      hook,
      true,
      new Query(),
      messages.IdGenerator.incrementing(),
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )
  })

  describe('#execute', () => {
    it('returns a TestStepFinished with status UNDEFINED when there are no matching step definitions', async () => {
      const testStepResult = await undefinedPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        true
      )
      assert.strictEqual(testStepResult.status, 'UNDEFINED')
      assert.deepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status AMBIGUOUS when there are multiple matching step definitions', async () => {
      const testStepResult = await ambiguousPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        true
      )
      assert.strictEqual(testStepResult.status, 'AMBIGUOUS')
      assert.deepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status PASSED when the sole step definitions passes', async () => {
      const testStepResult = await passedPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        true
      )
      assert.strictEqual(testStepResult.status, 'PASSED')
      assert.notDeepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status PENDING when the sole step definitions returns "pending"', async () => {
      const testStepResult = await pendingPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        true
      )
      assert.strictEqual(testStepResult.status, 'PENDING')
      assert.notDeepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status SKIPPED when the sole step definitions returns "skipped"', async () => {
      const testStepResult = await skippedPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        true
      )
      assert.strictEqual(testStepResult.status, 'SKIPPED')
      assert.notDeepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status FAILED when the sole step definitions throws an exception', async () => {
      const testStepResult = await failedPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        true
      )
      assert.strictEqual(testStepResult.status, 'FAILED')
      assert.ok(testStepResult.message.includes('at failed.feature:234'))
      assert.notDeepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status SKIPPED when the previous step was not passed', async () => {
      const testStepResult = await failedPickleTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        false
      )
      assert.strictEqual(testStepResult.status, 'SKIPPED')
      assert.deepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })

    it('returns a TestStepResult with status FAILED when the previous aftr hook step was not passed', async () => {
      const testStepResult = await failedHookTestStep.execute(
        world,
        'some-testCaseStartedId',
        () => undefined,
        false
      )
      assert.strictEqual(testStepResult.status, 'FAILED')
      assert.notDeepStrictEqual(testStepResult.duration, TimeConversion.millisecondsToDuration(0))
    })
  })
})
