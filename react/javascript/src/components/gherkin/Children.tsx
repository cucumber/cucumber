import React from 'react'
import defaultStyles from './Anchor.module.scss'
import {
  ChildrenClasses,
  ChildrenProps,
  DefaultComponent,
  useCustomRendering
} from '../customise'

const DefaultRenderer: DefaultComponent<ChildrenProps, ChildrenClasses> = ({ styles, children }) => {
  return (
    <div className={styles.children}>
      {children}
    </div>
  )
}

export const Children: React.FunctionComponent<ChildrenProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<ChildrenProps, ChildrenClasses>(
    'Children',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}
