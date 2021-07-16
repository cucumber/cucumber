import React from 'react'
import { DataTable } from './DataTable'
import { Keyword } from './Keyword'
import { DocString } from './DocString'
import { ErrorMessage } from './ErrorMessage'
import { StepItem } from './StepItem'
import { Attachment } from './Attachment'
import { Parameter } from './Parameter'
import { Title } from './Title'
import * as messages from '@cucumber/messages'
import { getWorstTestStepResult } from '@cucumber/messages'
import CucumberQueryContext from '../../CucumberQueryContext'
import GherkinQueryContext from '../../GherkinQueryContext'
import { HighLight } from '../app/HighLight'

interface IProps {
  step: messages.Step
  hasExamples: boolean
}

export const Step: React.FunctionComponent<IProps> = ({ step, hasExamples }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)

  const pickleStepIds = gherkinQuery.getPickleStepIds(step.id)
  const pickleStepTestStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)
  const testStepResult = getWorstTestStepResult(pickleStepTestStepResults)
  const attachments = cucumberQuery.getPickleStepAttachments(pickleStepIds)

  const stepTextElements: JSX.Element[] = []

  if (!hasExamples) {
    const stepMatchArgumentsLists =
      pickleStepIds.length === 0
        ? // This can happen in rare cases for background steps in a document that only has step-less scenarios,
          // because background steps are not added to the pickle when the scenario has no steps. In this case
          // the background step will be rendered as undefined (even if there are matching step definitions). This
          // is not ideal, but it is rare enough that we don't care about it for now.
          []
        : cucumberQuery.getStepMatchArgumentsLists(pickleStepIds[0]) || []
    if (stepMatchArgumentsLists.length === 1) {
      // Step is defined
      const stepMatchArguments = stepMatchArgumentsLists[0].stepMatchArguments
      let offset = 0
      let plain: string
      stepMatchArguments.forEach((argument, index) => {
        plain = step.text.slice(offset, argument.group.start)
        if (plain.length > 0) {
          stepTextElements.push(<HighLight key={`plain-${index}`} text={plain} />)
        }
        const arg = argument.group.value
        if (arg) {
          if (arg.length > 0) {
            stepTextElements.push(
              <Parameter parameterTypeName={argument.parameterTypeName} key={`param-${index}`}>
                <HighLight text={arg} />
              </Parameter>
            )
          }
          offset += plain.length + arg.length
        }
      })
      plain = step.text.slice(offset)
      if (plain.length > 0) {
        stepTextElements.push(<HighLight key={`plain-rest`} text={plain} />)
      }
    } else if (stepMatchArgumentsLists.length >= 2) {
      // Step is ambiguous
      stepTextElements.push(<HighLight key={`plain-ambiguous`} text={step.text} />)
    } else {
      // Step is undefined
      stepTextElements.push(<HighLight key={`plain-undefined`} text={step.text} />)
    }
  } else {
    // Step is from scenario with examples, and has <> placeholders.
    stepTextElements.push(<HighLight key={`plain-placeholders`} text={step.text} />)
  }

  return (
    <StepItem status={testStepResult.status}>
      <Title header="h3" id={step.id}>
        <Keyword>{step.keyword.trim()}</Keyword>
        <span>{stepTextElements}</span>
      </Title>
      {step.dataTable && <DataTable dataTable={step.dataTable} />}
      {step.docString && <DocString docString={step.docString} />}
      {!hasExamples && testStepResult.message && <ErrorMessage message={testStepResult.message} />}
      {!hasExamples &&
        attachments.map((attachment, i) => <Attachment key={i} attachment={attachment} />)}
    </StepItem>
  )
}
