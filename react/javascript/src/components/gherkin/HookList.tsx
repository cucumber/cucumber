import * as messages from '@cucumber/messages'
import React from 'react'
import { HookStep } from './HookStep'

interface IProps {
  hookSteps: readonly messages.TestStep[]
}

export const HookList: React.FunctionComponent<IProps> = ({ hookSteps }) => {
  return (
    <>
      {hookSteps.map((step, index) => (
        <li key={index}>
          <HookStep key={index} step={step} />
        </li>
      ))}
    </>
  )
}
