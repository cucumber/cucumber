import fs from 'fs'
import * as messages from '@cucumber/messages'
import { NdjsonToMessageStream } from '@cucumber/message-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import React from 'react'
import ReactDOM from 'react-dom'
import { JSDOM } from 'jsdom'
import { components, EnvelopesQuery } from '../src'
import { Query as CucumberQuery } from '@cucumber/query'
import { promisify } from 'util'
import { pipeline, Writable } from 'stream'
import glob from 'glob'

const asyncPipeline = promisify(pipeline)

describe('App with messages', () => {
  const localMessageFiles = glob.sync(`${__dirname}/messages/**/*.ndjson`)
  const tckMessageFiles = glob.sync(
    `${__dirname}/../../../compatibility-kit/javascript/features/**/*.ndjson`
  )
  const messageFiles = [].concat(localMessageFiles, tckMessageFiles)

  for (const messageFile of messageFiles) {
    it(`can render ${messageFile}`, async () => {
      const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
      // @ts-ignore
      global.window = dom.window
      // global.navigator = dom.window.navigator
      const document = dom.window.document

      const gherkinQuery = new GherkinQuery()
      const cucumberQuery = new CucumberQuery()
      const envelopesQuery = new EnvelopesQuery()

      const messageStream = new NdjsonToMessageStream()

      await asyncPipeline(
        fs.createReadStream(messageFile, 'utf-8'),
        messageStream,
        new Writable({
          objectMode: true,
          write(
            envelope: messages.Envelope,
            encoding: string,
            callback: (error?: Error | null) => void
          ) {
            gherkinQuery.update(envelope)
            cucumberQuery.update(envelope)
            envelopesQuery.update(envelope)
            callback()
          },
        })
      )

      const app = (
        <components.app.QueriesWrapper
          gherkinQuery={gherkinQuery}
          cucumberQuery={cucumberQuery}
          envelopesQuery={envelopesQuery}
        >
          <components.app.GherkinDocumentList
            gherkinDocuments={gherkinQuery.getGherkinDocuments()}
          />
        </components.app.QueriesWrapper>
      )
      ReactDOM.render(app, document.getElementById('content'))
    }).timeout(30000)
  }
})
