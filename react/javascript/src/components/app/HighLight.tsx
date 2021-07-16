import React from 'react'
import SearchQueryContext from '../../SearchQueryContext'
import elasticlunr from 'elasticlunr'
import highlightWords from 'highlight-words'
import ReactMarkdown from 'react-markdown'
import rehypePlugins from './rehypePlugins'

interface IProps {
  text: string
  markdown?: boolean
  className?: string
}

const allQueryWords = (queryWords: string[]): string[] => {
  return queryWords.reduce((allWords, word) => {
    const stem = elasticlunr.stemmer(word)
    allWords.push(word)

    if (stem !== word) {
      allWords.push(stem)
    }
    return allWords
  }, [] as string[])
}

export const HighLight: React.FunctionComponent<IProps> = ({
  text,
  markdown = false,
  className = '',
}) => {
  const searchQueryContext = React.useContext(SearchQueryContext)
  const query = allQueryWords(
    searchQueryContext.query ? searchQueryContext.query.split(' ') : []
  ).join(' ')
  const appliedClassName = className ? `highlight ${className}` : 'highlight'

  const chunks = highlightWords({ text, query })

  if (markdown) {
    const highlightedText = chunks
      .map(({ text, match }) => (match ? `<mark>${text}</mark>` : text))
      .join('')

    return (
      <div className={appliedClassName}>
        <ReactMarkdown rehypePlugins={rehypePlugins}>{highlightedText}</ReactMarkdown>
      </div>
    )
  }

  return (
    <span className={appliedClassName}>
      {chunks.map(({ text, match, key }) => (match ? <mark key={key}>{text}</mark> : text))}
    </span>
  )
}
