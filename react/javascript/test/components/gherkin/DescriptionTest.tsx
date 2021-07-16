import assert from 'assert'
import React from 'react'
import { Description } from '../../../src/components/gherkin'
import { render } from '../utils'

describe('Description', () => {
  it('doesnt render anything if description empty', () => {
    const { container } = render(<Description description={''} />)
    assert.strictEqual(container.innerHTML, '')
  })

  it('doesnt render anything if description is just whitespace', () => {
    const { container } = render(<Description description={'  '} />)
    assert.strictEqual(container.innerHTML, '')
  })

  it('doesnt render anything if description is just whitespace including newlines', () => {
    const { container } = render(
      <Description
        description={`
    
    `}
      />
    )
    assert.strictEqual(container.innerHTML, '')
  })

  it('renders if we really have a description', () => {
    const { container } = render(<Description description={'## This is a heading'} />)
    const rendered = container.querySelector('h2')
    assert.strictEqual(rendered.innerHTML, 'This is a heading')
  })
})
