import { Before, Given } from '@cucumber/fake-cucumber'

Before('@skip', function () {
  return 'skipped'
})

Given('a step', function () {
  // no-op
})

Given('a step that skips', function () {
  return 'skipped'
})
