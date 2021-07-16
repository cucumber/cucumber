import React from 'react'
import * as messages from '@cucumber/messages'
import EnvelopesQueryContext, { EnvelopesQuery } from '../../EnvelopesQueryContext'
import { CICommitLink } from './CICommitLink'
import getDurationsMillis from '../../getDurationMillis'
import { Duration } from './Duration'

interface IProductProps {
  name: string
  product: messages.Product
}

export const Product: React.FunctionComponent<IProductProps> = ({
  name: name,
  product: product,
}) => {
  const value = [product.name, product.version]
    .filter((v) => v !== '' && v !== undefined && v !== null)
    .join(' - ')

  return (
    <tr>
      <th>{name}</th>
      <td>{value}</td>
    </tr>
  )
}

function findTestRunStarted(envelopesQuery: EnvelopesQuery): messages.TestRunStarted {
  const testRunStarted = envelopesQuery.find((envelope) => envelope.testRunStarted !== null)
  return testRunStarted ? testRunStarted.testRunStarted : undefined
}

function findTestRunFinished(envelopesQuery: EnvelopesQuery): messages.TestRunFinished {
  const testRunFinished = envelopesQuery.find((envelope) => envelope.testRunFinished !== null)
  return testRunFinished ? testRunFinished.testRunFinished : undefined
}

interface IProps {
  meta: messages.Meta
}

export const ExecutionSummary: React.FunctionComponent<IProps> = ({ meta: meta }) => {
  const envelopesQuery = React.useContext(EnvelopesQueryContext)

  const testRunStarted = findTestRunStarted(envelopesQuery)
  const testRunFinished = findTestRunFinished(envelopesQuery)
  const millisDuration = getDurationsMillis(testRunStarted, testRunFinished)

  return (
    <div className="cucumber-execution-data">
      <table>
        <tbody>
          {millisDuration && (
            <tr>
              <th>Duration</th>
              <td>
                <Duration durationMillis={millisDuration} />
              </td>
            </tr>
          )}
          {meta.ci && (
            <tr>
              <th>Build</th>
              <td>
                <a href={meta.ci.url}>{meta.ci.name}</a>
              </td>
            </tr>
          )}
          {meta.ci && (
            <tr>
              <th>Commit</th>
              <td>
                <CICommitLink ci={meta.ci} />
              </td>
            </tr>
          )}
          {meta.implementation && <Product name="Implementation" product={meta.implementation} />}
          {meta.runtime && <Product name="Runtime" product={meta.runtime} />}
          {meta.os && <Product name="OS" product={meta.os} />}
          {meta.cpu && <Product name="CPU" product={meta.cpu} />}
        </tbody>
      </table>
    </div>
  )
}
