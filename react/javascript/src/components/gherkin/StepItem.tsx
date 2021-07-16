import React from 'react'

import { StatusIcon } from './StatusIcon'
import * as messages from '@cucumber/messages'
import styles from './StepItem.module.scss'

export const StepItem: React.FunctionComponent<{
  status?: messages.TestStepResultStatus
}> = ({ status, children }) => {
  return (
    <div className={styles.container}>
      <span className={styles.status}>{status && <StatusIcon status={status} />}</span>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default StepItem
