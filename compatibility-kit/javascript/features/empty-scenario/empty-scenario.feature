Feature: minimal
  Scenario can be empty.
  Background and hooks are not executed.
  The state of the scenario is `undefined`
  
  Background:
    Given a background step

  Scenario: empty
