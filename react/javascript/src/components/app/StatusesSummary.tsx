import React from 'react'
import statusName from '../gherkin/statusName'
import { StatusIcon } from '../gherkin/StatusIcon'
import * as messages from '@cucumber/messages'
import statuses from './statuses'

interface IProps {
  scenarioCountByStatus: Map<messages.TestStepResultStatus, number>
}

export const StatusesSummary: React.FunctionComponent<IProps> = ({
  scenarioCountByStatus: scenarioCountByStatus,
}) => {
  return (
    <div className="cucumber-status-filter">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Execution summary</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => {
            const name = statusName(status)
            const scenarioCount = scenarioCountByStatus.get(status)

            if (scenarioCount === undefined) {
              return
            }

            return (
              <tr key={index}>
                <td>
                  <StatusIcon status={status} /> {name}
                </td>
                <td>{scenarioCount} scenarios</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
