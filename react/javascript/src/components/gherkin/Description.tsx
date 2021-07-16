import React from 'react'
import { HighLight } from '../app/HighLight'
import {
  DefaultComponent,
  DescriptionClasses,
  DescriptionProps,
  useCustomRendering,
} from '../customise'
import defaultStyles from './Description.module.scss'

const DefaultRenderer: DefaultComponent<DescriptionProps, DescriptionClasses> = ({
  description,
  styles,
}) => {
  if (!description || description.trim() === '') {
    return null
  }
  return (
    <div className={styles.content}>
      <HighLight text={description} markdown={true} />
    </div>
  )
}

export const Description: React.FunctionComponent<DescriptionProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<DescriptionProps, DescriptionClasses>(
    'Description',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}
