import * as messages from '@cucumber/messages'
import React from 'react'
import { Step } from './Step'

interface IProps {
  steps: readonly messages.Step[]
  hasExamples: boolean
}

export const StepList: React.FunctionComponent<IProps> = ({ steps, hasExamples }) => {
  return (
    <>
      {steps.map((step, index) => (
        <li key={index}>
          <Step key={index} step={step} hasExamples={hasExamples} />
        </li>
      ))}
    </>
  )
}
