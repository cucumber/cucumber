import React from 'react'
import { HighLight } from '../app/HighLight'
import defaultStyles from './DocString.module.scss'
import {
  DefaultComponent,
  DocStringClasses,
  DocStringProps,
  useCustomRendering,
} from '../customise'

const DefaultRenderer: DefaultComponent<DocStringProps, DocStringClasses> = ({
  docString,
  styles,
}) => {
  return (
    <pre className={styles.docString}>
      <HighLight text={docString.content} />
    </pre>
  )
}

export const DocString: React.FunctionComponent<DocStringProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<DocStringProps, DocStringClasses>(
    'DocString',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}
