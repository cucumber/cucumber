import React from 'react'
import * as messages from '@cucumber/messages'
import ciCommitLink from '../../ciCommitLink'

interface IProps {
  ci: messages.Ci
}

export const CICommitLink: React.FunctionComponent<IProps> = ({ ci: ci }) => {
  const commitLink = ciCommitLink(ci)

  if (commitLink) {
    return <a href={commitLink}>#{ci.git.revision}</a>
  }
  return <span>#{ci.git.revision}</span>
}
