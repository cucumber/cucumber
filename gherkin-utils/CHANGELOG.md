# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

* Added new command-line tool for formatting Gherkin documents and converting to/from Gherkin/Markdown.
  Run `npx @cucumber/gherkin-utils --help` for details about usage.

### Changed

### Deprecated

### Removed

### Fixed

## [5.1.0] - 2021-05-26

### Added

* Added `getSource`, `getFeature`, `getBackground`, `getRule`, `getScenario` and `getExamples` methods

## [5.0.2] - 2021-05-17

### Changed

* Upgrade to `@cucumber/message-streams` `2.0.0`

## [5.0.1] - 2021-05-17

### Fixed

* Use `^x.y.z` version for `@cucumber/*` dependencies, allowing minor and patch releases to be picked up.

## [5.0.0] - 2021-05-15

### Added

* Added `Query#getSources(): readonly messages.ISource[]`

### Changed

* Upgrade to messages 16.0.0

## [4.0.0] - 2021-03-29

### Changed

* Upgrade to messages 15.0.0

## [3.0.0] - 2021-02-07

### Changed

* Upgrade to messages 14.0.0

## [2.1.1] - 2020-12-13

### Fixed

* [JavaScript] Remove unneded dependency on `@cucumber/gherkin`

## [2.1.0] - 2020-11-03

### Added

* [JavaScript] The `Query` class has been added to this library, moved from `@cucumber/gherkin`

## [2.0.1] - 2020-09-02

### Fixed

* Do not fail when walking empty or commented Gherkin documents.
  ([#1169](https://github.com/cucumber/cucumber/pull/1169)
   [@vincent-psarga]
   [@aslakhellesoy]
   [@cbliard])

## [2.0.0] - 2020-08-07

### Changed

* Update `messages` to 13.0.1

## [1.0.1] - 2020-06-29

### Fixed

* [JavaScript] Upgrade Gherkin

## [1.0.0] - 2020-06-25

### Added

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/gherkin-utils/v5.1.0...main
[5.1.0]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v5.0.2...gherkin-utils/v5.1.0
[5.0.2]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v5.0.1...gherkin-utils/v5.0.2
[5.0.1]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v5.0.0...gherkin-utils/v5.0.1
[5.0.0]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v4.0.0...gherkin-utils/v5.0.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v3.0.0...gherkin-utils/v4.0.0
[3.0.0]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v2.1.1...gherkin-utils/v3.0.0
[2.1.1]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v2.1.0...gherkin-utils/v2.1.1
[2.1.0]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v2.0.1...gherkin-utils/v2.1.0
[2.0.1]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v2.0.0...gherkin-utils/v2.0.1
[2.0.0]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v1.0.1...gherkin-utils/v2.0.0
[1.0.1]:      https://github.com/cucumber/cucumber/compare/gherkin-utils/v1.0.0...gherkin-utils/v1.0.1
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/gherkin-utils/v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[cbliard]:          https://github.com/cbliard
[vincent-psarga]:   https://github.com/vincent-psarga
