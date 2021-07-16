import React from 'react'
import { Attachment } from '../../../src/components/gherkin'
import * as messages from '@cucumber/messages'
import assert from 'assert'
import { render } from '../utils'

describe('<Attachment>', () => {
  it('renders an image', () => {
    const binary = new Uint8Array(10)
    binary.fill(255, 0, binary.length)
    const attachment: messages.Attachment = {
      mediaType: 'image/png',
      body: 'fake-base64',
      contentEncoding: messages.AttachmentContentEncoding.BASE64,
    }
    const { container } = render(<Attachment attachment={attachment} />)
    const img = container.querySelector('img')
    assert.strictEqual(img.getAttribute('src'), 'data:image/png;base64,fake-base64')
  })

  it('renders base64 encoded plaintext', () => {
    const attachment: messages.Attachment = {
      mediaType: 'text/plain',
      body: Buffer.from('hello').toString('base64'),
      contentEncoding: messages.AttachmentContentEncoding.BASE64,
    }
    const { container } = render(<Attachment attachment={attachment} />)
    const pre = container.querySelector('pre')
    assert.strictEqual(pre.textContent, 'hello')
  })

  it('correctly renders ANSI characters', () => {
    const attachment: messages.Attachment = {
      mediaType: 'text/x.cucumber.log+plain',
      body: '\x1b[30mblack\x1b[37mwhite',
      contentEncoding: messages.AttachmentContentEncoding.IDENTITY,
    }
    const { container } = render(<Attachment attachment={attachment} />)
    const span = container.querySelector('pre > span')
    assert.strictEqual(
      span.innerHTML,
      '<span style="color:#000">black<span style="color:#AAA">white</span></span>'
    )
  })
})
