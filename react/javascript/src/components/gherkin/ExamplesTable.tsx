import React from 'react'
import * as messages from '@cucumber/messages'
import { getWorstTestStepResult } from '@cucumber/messages'
import defaultStyles from './DataTable.module.scss'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import UriContext from '../../UriContext'
import { StatusIcon } from './StatusIcon'
import { ErrorMessage } from './ErrorMessage'
import isNumber from './isNumber'
import {
  DefaultComponent,
  ExamplesTableClasses,
  ExamplesTableProps,
  useCustomRendering,
} from '../customise'
import { Attachment } from './Attachment'

const DefaultRenderer: DefaultComponent<ExamplesTableProps, ExamplesTableClasses> = ({
  tableHeader,
  tableBody,
  styles,
}) => {
  return (
    <table className={styles.examplesTable}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          {tableHeader.cells.map((cell, j) => (
            <th key={j}>{cell.value}</th>
          ))}
        </tr>
      </thead>
      <ExamplesTableBody rows={tableBody || []} detailClass={styles.detailRow} />
    </table>
  )
}

export const ExamplesTable: React.FunctionComponent<ExamplesTableProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<ExamplesTableProps, ExamplesTableClasses>(
    'ExamplesTable',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}

const ExamplesTableBody: React.FunctionComponent<{
  rows: readonly messages.TableRow[]
  detailClass?: string
}> = ({ rows, detailClass }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <RowOrRows row={row} key={i} detailClass={detailClass} />
      ))}
    </tbody>
  )
}

const RowOrRows: React.FunctionComponent<{
  row: messages.TableRow
  detailClass?: string
}> = ({ row, detailClass }) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const uri = React.useContext(UriContext)

  const testStepResult = getWorstTestStepResult(
    cucumberQuery.getPickleTestStepResults(gherkinQuery.getPickleIds(uri, row.id))
  )

  const pickleStepIds = gherkinQuery.getPickleStepIds(row.id)
  const attachments = cucumberQuery.getPickleStepAttachments(pickleStepIds)

  return (
    <>
      <tr>
        <td>
          <StatusIcon status={testStepResult.status} />
        </td>
        {row.cells.map((cell, j) => (
          <td key={j} style={{ textAlign: isNumber(cell.value) ? 'right' : 'left' }}>
            {cell.value}
          </td>
        ))}
      </tr>
      <AttachmentAndErrorRow
        key="row-error"
        className={detailClass}
        attachments={attachments}
        errorMessage={testStepResult.message}
        colSpan={row.cells.length}
      />
    </>
  )
}

interface IAttachmentAndErrorRowProps {
  attachments: readonly messages.Attachment[]
  errorMessage: string
  colSpan: number
  className?: string
}

const AttachmentAndErrorRow: React.FunctionComponent<IAttachmentAndErrorRowProps> = ({
  attachments,
  errorMessage,
  colSpan,
  className,
}) => {
  if (!errorMessage && attachments.length === 0) return null
  return (
    <tr className={className}>
      <td>&nbsp;</td>
      <td colSpan={colSpan}>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {attachments.map((attachment, i) => (
          <Attachment key={i} attachment={attachment} />
        ))}
      </td>
    </tr>
  )
}
