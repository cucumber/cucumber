import React from 'react'
import * as messages from '@cucumber/messages'

interface IProps {
  query: string
  matches: readonly messages.GherkinDocument[]
}

export const NoMatchResult: React.FunctionComponent<IProps> = ({ query, matches }) => {
  const showNoMatchMessage = query !== '' && matches.length === 0

  return (
    <p className="cucumber-no-documents">
      {showNoMatchMessage && `No match found for: "${query}"`}
    </p>
  )
}
