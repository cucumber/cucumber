import assert from 'assert'
import React from 'react'
import { Tags } from '../../../src/components/gherkin'
import { render } from '../utils'

describe('Tags', () => {
  it('doesnt render anything if no tags', () => {
    const { container } = render(<Tags tags={[]} />)
    assert.strictEqual(container.innerHTML, '')
  })

  it('renders if we really have some tags', () => {
    const tags = [
      {
        location: {
          line: 1,
        },
        name: '@foo',
        id: '1',
      },
      {
        location: {
          line: 3,
        },
        name: '@bar',
        id: '2',
      },
    ]
    const { container } = render(<Tags tags={tags} />)
    assert.strictEqual(container.querySelectorAll('ul li').length, 2)
  })
})
