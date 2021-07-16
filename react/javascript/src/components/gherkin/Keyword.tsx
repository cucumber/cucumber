import React from 'react'
import defaultStyles from './Keyword.module.scss'
import { DefaultComponent, KeywordClasses, useCustomRendering } from '../customise'

const DefaultRenderer: DefaultComponent<any, KeywordClasses> = ({ children, styles }) => {
  return <span className={styles.keyword}>{children}</span>
}

export const Keyword: React.FunctionComponent = ({ children }) => {
  const ResolvedRenderer = useCustomRendering<any, KeywordClasses>(
    'Keyword',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer>{children}</ResolvedRenderer>
}
