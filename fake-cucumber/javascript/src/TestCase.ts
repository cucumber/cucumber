import { EnvelopeListener, ITestCase, ITestStep, IWorld } from './types'
import * as messages from '@cucumber/messages'
import IClock from './IClock'
import { getWorstTestStepResult } from '@cucumber/messages'

const { millisecondsSinceEpochToTimestamp } = messages.TimeConversion

export default class TestCase implements ITestCase {
  constructor(
    public readonly id: string,
    private readonly testSteps: ITestStep[],
    private readonly pickleId: string,
    private readonly clock: IClock
  ) {}

  public toMessage(): messages.Envelope {
    return {
      testCase: {
        id: this.id,
        pickleId: this.pickleId,
        testSteps: this.testSteps.map((step) => step.toMessage()),
      },
    }
  }

  public async execute(
    listener: EnvelopeListener,
    attempt: number,
    retryable: boolean,
    testCaseStartedId: string
  ): Promise<messages.TestStepResultStatus> {
    listener({
      testCaseStarted: {
        attempt,
        testCaseId: this.id,
        id: testCaseStartedId,
        timestamp: millisecondsSinceEpochToTimestamp(this.clock.clockNow()),
      },
    })

    const world: IWorld = {
      attach: () => {
        throw new Error('Attach is not ready')
      },
      log: () => {
        throw new Error('Log is not ready')
      },
    }

    const testStepResults: messages.TestStepResult[] = []
    let previousPassed = true
    for (const testStep of this.testSteps) {
      const testStepResult: messages.TestStepResult = await testStep.execute(
        world,
        testCaseStartedId,
        listener,
        previousPassed
      )
      previousPassed = testStepResult.status === messages.TestStepResultStatus.PASSED
      testStepResults.push(testStepResult)
    }

    const willBeRetried =
      retryable &&
      getWorstTestStepResult(testStepResults).status === messages.TestStepResultStatus.FAILED

    listener({
      testCaseFinished: {
        testCaseStartedId: testCaseStartedId,
        timestamp: millisecondsSinceEpochToTimestamp(this.clock.clockNow()),
        willBeRetried,
      },
    })

    const finalStepResult = getWorstTestStepResult(testStepResults)
    return finalStepResult.status
  }
}
