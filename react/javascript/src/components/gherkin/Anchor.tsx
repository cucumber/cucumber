import React from 'react'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultStyles from './Anchor.module.scss'
import { AnchorClasses, AnchorProps, DefaultComponent, useCustomRendering } from '../customise'

const DefaultRenderer: DefaultComponent<AnchorProps, AnchorClasses> = ({ id, styles, children }) => {
  return (
    <div className={styles.wrapper}>
      <a href={'#' + id} className={defaultStyles.anchor}>
        <FontAwesomeIcon icon={faLink} />
      </a>
      {children}
    </div>
  )
}

export const Anchor: React.FunctionComponent<AnchorProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<AnchorProps, AnchorClasses>(
    'Anchor',
    defaultStyles,
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}
