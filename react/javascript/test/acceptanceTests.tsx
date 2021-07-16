import path from 'path'
import fs from 'fs'
import { IdGenerator } from '@cucumber/messages'
import { GherkinStreams } from '@cucumber/gherkin-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import React from 'react'
import ReactDOM from 'react-dom'
import { JSDOM } from 'jsdom'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { EnvelopesQuery } from '../src'
import { Query as CucumberQuery } from '@cucumber/query'
import { components } from '../src'
import CucumberQueryStream from './CucumberQueryStream'

describe('App', () => {
  const dir = __dirname + '/../../../gherkin/testdata/good'
  const files = fs.readdirSync(dir)

  for (const file of files) {
    if (file.match(/\.feature$/)) {
      it(`can render ${file}`, async () => {
        const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
        // @ts-ignore
        global.window = dom.window
        // global.navigator = dom.window.navigator
        const document = dom.window.document

        const supportCode = new SupportCode()
        const p = path.join(dir, file)
        const gherkinStream = GherkinStreams.fromPaths([p], {
          newId: IdGenerator.incrementing(),
        })
        const gherkinQuery = new GherkinQuery()
        const cucumberQuery = new CucumberQuery()
        const envelopesQuery = new EnvelopesQuery()

        const cucumberQueryStream = new CucumberQueryStream(cucumberQuery)
        await runCucumber(supportCode, gherkinStream, gherkinQuery, cucumberQueryStream)
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
      }).timeout(10000)
    }
  }
})
