import * as messages from '@cucumber/messages'
import React from 'react'
import { Feature } from './Feature'

interface IProps {
  gherkinDocument: messages.GherkinDocument
}

export const GherkinDocument: React.FunctionComponent<IProps> = ({ gherkinDocument }) => {
  return gherkinDocument.feature ? <Feature feature={gherkinDocument.feature} /> : null
}
