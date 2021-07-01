import * as messages from '@cucumber/messages'
import { Query } from '@cucumber/gherkin-utils'
import TestCase from './TestCase'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import EmptyPickleTestStep from './EmptyPickleTestStep'
import { MakePickleTestStep, MakeHookTestStep, IStepDefinition, IHook, ITestStep } from './types'
import IStopwatch from './IStopwatch'

export default function makeTestCase(
  pickle: messages.Pickle,
  stepDefinitions: readonly IStepDefinition[],
  beforeHooks: readonly IHook[],
  afterHooks: readonly IHook[],
  gherkinQuery: Query,
  newId: messages.IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage,
  makePickleTestStep: MakePickleTestStep,
  makeHookStep: MakeHookTestStep
): TestCase {
  if (pickle.steps.length === 0) {
    return new TestCase(newId(), [], pickle.id, clock)
  }

  const beforeHookSteps = makeHookSteps(
    pickle,
    beforeHooks,
    false,
    gherkinQuery,
    newId,
    clock,
    stopwatch,
    makeErrorMessage,
    makeHookStep
  )
  const pickleTestSteps = pickle.steps.map((pickleStep) => {
    const sourceFrames = (pickleStep.astNodeIds || []).map(
      (astNodeId) => `${pickle.uri}:${gherkinQuery.getLocation(astNodeId).line}`
    )
    return makePickleTestStep(
      newId(),
      pickleStep,
      stepDefinitions,
      sourceFrames,
      clock,
      stopwatch,
      makeErrorMessage
    )
  })
  const afterHookSteps = makeHookSteps(
    pickle,
    afterHooks,
    true,
    gherkinQuery,
    newId,
    clock,
    stopwatch,
    makeErrorMessage,
    makeHookStep
  )
  const testSteps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleTestSteps)
    .concat(afterHookSteps)

  return new TestCase(newId(), testSteps, pickle.id, clock)
}

function makeHookSteps(
  pickle: messages.Pickle,
  hooks: readonly IHook[],
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: messages.IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage,
  makeHookStep: MakeHookTestStep
): ITestStep[] {
  return hooks
    .map((hook) =>
      makeHookStep(
        pickle,
        hook,
        alwaysExecute,
        gherkinQuery,
        newId,
        clock,
        stopwatch,
        makeErrorMessage
      )
    )
    .filter((testStep) => testStep !== undefined)
}
