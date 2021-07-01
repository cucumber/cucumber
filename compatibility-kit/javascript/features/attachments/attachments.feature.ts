import { Before, When } from '@cucumber/fake-cucumber'
import { ReadableStreamBuffer } from 'stream-buffers'
import fs from 'fs'

// Cucumber-JVM needs to use a Before hook in order to create attachments
Before(() => undefined)

When('the string {string} is attached as {string}', function (text: string, mediaType: string) {
  this.attach(text, mediaType)
})

When('the string {string} is logged', function (text: string) {
  this.log(text)
})

When('text with ANSI escapes is logged', function () {
  this.log(
    'This displays a \x1b[31mr\x1b[0m\x1b[91ma\x1b[0m\x1b[33mi\x1b[0m\x1b[32mn\x1b[0m\x1b[34mb\x1b[0m\x1b[95mo\x1b[0m\x1b[35mw\x1b[0m'
  )
})

When('the following string is attached as {string}:', function (mediaType: string, text: string) {
  this.attach(text, mediaType)
})

When(
  'an array with {int} bytes is attached as {string}',
  function (size: number, mediaType: string) {
    const data = [...Array(size).keys()]
    const buffer = Buffer.from(data.map((k) => k + 1))
    this.attach(buffer, mediaType)
  }
)

When(
  'a stream with {int} bytes are attached as {string}',
  async function (size: number, mediaType: string) {
    const data = [...Array(size).keys()]
    const buffer = Buffer.from(data)
    const stream = new ReadableStreamBuffer({ chunkSize: 1, frequency: 1 })
    stream.put(buffer)
    stream.stop()

    await this.attach(stream, mediaType)
  }
)

When('a JPEG image is attached', async function () {
  await this.attach(fs.createReadStream(__dirname + '/cucumber.png'), 'image/png')
})

When('the {word} png is attached', async function (filename) {
  await this.attach(fs.createReadStream(__dirname + `/${filename}`), 'image/png')
})
