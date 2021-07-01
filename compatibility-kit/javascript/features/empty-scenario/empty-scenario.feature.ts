import assert from 'assert'
import { Given, Before, After } from '@cucumber/fake-cucumber'

Given('a background step', function () {
  assert(false, 'Background step should not be executed')
})

Before(function () {
  assert(false, 'Before Hook should not be executed')
})

After(function () {
  assert(false, 'After Hook should not be executed')
})
