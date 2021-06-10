# gherkin-utils

This library is a set of utilities to work with Gherkin documents and AST.

## Command line

The command-line tool can be used to format `.feature` files or translate `.feature` files
into `.feature.md` files.

Example usage:

    # Translate all `.feature` files to `.feature.md` files and delete the `.feature` files.
    # See https://github.com/cucumber/common/blob/main/gherkin/MARKDOWN_WITH_GHERKIN.md
    # Note that the globs must be quoted to prevent the shell from expanding the globs.
    npx @cucumber/gherkin-utils format --move "features/**/*.feature" "features/**/*.feature.md"

More details:

    npx @cucumber/gherkin-utils --help

## As a library

This module can also be used as a library. It provides two main utilities, `pretty` and `gherkinDocumentWalker`.

### pretty(gherkinDocument: messages.GherkinDocument, syntax: 'gherkin' | 'markdown')

This function takes a GherkinDocument as input and returns a pretty-printed representatio in Gherkin or Markdown.

### GherkinDocumentWalker class

The GherkinDocumentWalker is a class for walking and filtering the AST produced by Gherkin after parsing a feature file.
When running `walkGherkinDocument` on a GherkinDocument, it will produce a deep copy of the object.

It takes two arguments upon creation:
 - filters: set of functions used to know if the walked elements are kept in the result. By default, all elements are kept.
 - handlers: set of function that can be used to alter the produced elements.

Filtering keeps the meaning of the original GherkinDocument, which means:
 - if a `Background` was present, it will always be in the `Feature` (or `Rule`)
 - the kept scenarios will have the same steps and examples than the original

By default, all elements are accepted, which means that if you want to do filtering you should reject all other elements. To ease this, we also provide the `rejectAllFilters`.

Here's an example:

```typescript
import { GherkinDocumentWalker, rejectAllFilters } from '@cucumber/gherkin-utils'

// Only keeps scenarios which name include 'magic'
const filter = new GherkinDocumentWalker({
  ...rejectAllFilters,
  ...{ acceptScenario: (scenario) => scenario.name.includes('magic') },
})

// Makes a list with all the scenario names
const allScenarioNames: string[] = []
const scenarioNameFinder = new GherkinDocumentWalker({}, {
  handleScenario: (scenario) => allScenarioNames.push(scenario.name),
})
```
