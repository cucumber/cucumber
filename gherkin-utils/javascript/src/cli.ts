import { Command } from 'commander'
import { version } from '../package.json'
import formatCommand from './commands/formatCommand'

const program = new Command()
program.version(version)

program
  .command('format')
  .arguments('<source> [destination]')
  .option('-m, --move', 'Delete the source file. If the destination is the same as the source, the file is not deleted.')
  .description(
    'Formats one or more <source> files and writes them to [destination].\nIf [destination] is not specified, the source files are modified in-place',
    {
      source:
        'A file path or a QUOTED glob, for example features/hello.feature or "features/**/*.feature"',
      destination:
        'A file path or a QUOTED glob, for example features/hello.feature.md or "features/**/*.feature.md"',
    }
  )
  .action(formatCommand)

program.parse(process.argv)
