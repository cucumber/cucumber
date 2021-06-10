import formatCommand, {makeToPath} from '../../src/commands/formatCommand'
import assert from 'assert'
import fs from 'fs'
import os from 'os'

describe('formatCommand', () => {
  let tmpdir: string
  beforeEach(async () => {
    tmpdir = fs.mkdtempSync(os.tmpdir() + '/')
  })

  it('formats single Gherkin file to Markdown file', async () => {
    const fromPath = `${tmpdir}/source.feature`
    await fs.writeFileSync(fromPath, 'Feature: Hello\n', 'utf-8')

    const toPath = `${tmpdir}/source.feature.md`

    await formatCommand(fromPath, toPath)
    const markdown = fs.readFileSync(toPath, 'utf-8')
    assert.deepStrictEqual(markdown, '# Feature: Hello\n')
  })

  it('formats several Gherkin files to several Markdown files', async () => {
    await fs.mkdirSync(`${tmpdir}/x/1`, { recursive: true })
    await fs.mkdirSync(`${tmpdir}/x/2`, { recursive: true })
    await fs.writeFileSync(`${tmpdir}/x/1/1.feature`, 'Feature: 1\n', 'utf-8')
    await fs.writeFileSync(`${tmpdir}/x/2/2.feature`, 'Feature: 2\n', 'utf-8')

    await formatCommand(`${tmpdir}/**/*.feature`, `${tmpdir}/**/*.feature.md`)

    const markdown1 = fs.readFileSync(`${tmpdir}/x/1/1.feature.md`, 'utf-8')
    assert.deepStrictEqual(markdown1, '# Feature: 1\n')
    const markdown2 = fs.readFileSync(`${tmpdir}/x/2/2.feature.md`, 'utf-8')
    assert.deepStrictEqual(markdown2, '# Feature: 2\n')
  })

  it('formats Gherkin files in-place', async () => {
    await fs.writeFileSync(`${tmpdir}/1.feature`, '     Feature:     1\n', 'utf-8')
    await formatCommand(`${tmpdir}/1.feature`, undefined)

    const gherkin = fs.readFileSync(`${tmpdir}/1.feature`, 'utf-8')
    assert.deepStrictEqual(gherkin, 'Feature: 1\n')
  })

  it('deletes the from file when move is specified', async () => {
    const from = `${tmpdir}/1.feature`;
    const to = `${tmpdir}/1.feature.md`;
    await fs.writeFileSync(from, 'Feature: 1\n', 'utf-8')
    await formatCommand(from, to, {move: true})

    const markdown = fs.readFileSync(to, 'utf-8')
    assert.deepStrictEqual(markdown, '# Feature: 1\n')
    assert(!fs.existsSync(from))
  })

  it('does not remove the from file when move is specified and to is the same as from', async () => {
    const from = `${tmpdir}/1.feature`;
    await fs.writeFileSync(from, '  Feature:   1\n', 'utf-8')
    await formatCommand(from, from, {move: true})

    const gherkin = fs.readFileSync(from, 'utf-8')
    assert.deepStrictEqual(gherkin, 'Feature: 1\n')
    assert(fs.existsSync(from))
  })

  describe('makeToPath', () => {
    it('does it', () => {
      const fromGlob = `/a/b/**/*.feature`
      const toGlob = `/x/y/**/*.feature.md`

      const toPath = makeToPath(`/a/b/c/d/e.feature`, fromGlob, toGlob)
      assert.deepStrictEqual(toPath, `/x/y/c/d/e.feature.md`)
    })
  })
})
