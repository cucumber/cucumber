import React from 'react'
import styles from './Title.module.scss'
import { Anchor } from './Anchor'

export type Header = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export const Title: React.FunctionComponent<{
  header: Header
  id: string
}> = ({ header: Header, id, children }) => {
  return (
    <Anchor id={id}>
      <Header id={id} className={styles.title}>
        {children}
      </Header>
    </Anchor>
  )
}
