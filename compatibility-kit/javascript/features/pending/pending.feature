Feature: Pending steps

  During development, step definitions can signal at runtime that they are
  not yet implemented (or "pending") by returning or throwing a particular
  value.

  This causes subsequent steps in the scenario to be skipped, and the overall
  result to be treated as a failure.

  Scenario: Unimplemented step signals pending status
    Given a step
    When a step that isnt implemented yet
    Then a step
