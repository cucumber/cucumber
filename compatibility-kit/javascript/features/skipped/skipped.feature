Feature: Skipping scenarios

  Hooks and step definitions are able to signal at runtime that the scenario should
  be skipped by returning or throwing a particular value.

  This can be useful when e.g. the current environment doesn't have the right conditions
  for running the scenario.

  @skip
  Scenario: Skipping from a Before hook
    Given a step

  Scenario: Skipping from a step
    Given a step
    When a step that skips
    Then a step
