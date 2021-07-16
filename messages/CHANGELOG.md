# CHANGE LOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

----
## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

- [Ruby] `seconds_to_duration` convert nanos to an integer to match the json schema
  ([#1655](https://github.com/cucumber/common/pull/1655))

## [17.0.0] - 2021-07-08

### Added

* Added `Ci#buildNumber` field
  ([#1632](https://github.com/cucumber/common/pull/1632)
   [#1606](https://github.com/cucumber/common/issues/1606)
   [aslakhellesoy])
* [Ruby] Generate DTOs from the json schemas to avoid usage of plain ruby hashes
  ([#1574](https://github.com/cucumber/common/issues/1574)
   [#1605](https://github.com/cucumber/common/pull/1605))
* [Java] Added various overloads to `JSON` to work with streams efficiently

### Changed

* **BREAKING** Move `willBeRetried` field from `TestStepResult` to `TestCaseFinished`
  ([#902](https://github.com/cucumber/common/issues/902) [#1631](https://github.com/cucumber/common/pull/1631))
* [Go] Move module paths to point to monorepo
  ([#1550](https://github.com/cucumber/common/issues/1550))
* [Java] Removed implicit utility class constructors and made classes final

## [16.0.1] - 2021-05-24

### Fixed

* [JavaScript] `addDurations` works with legacy messages that represent `seconds` as a `string`.

## [16.0.0] - 2021-05-15

### Added

* [Ruby] The generated code is added to Git.
  ([#1461](https://github.com/cucumber/cucumber/pull/1461)
   [aslakhellesoy])
* [JavaScript] Added `getWorstTestStepResult` function (moved from `@cucumber/query`)

### Changed

* [Go, Java, JavaScript, Ruby] The library no longer depends on protocol buffers. The message classes are generated from [JSON Schemas](https://github.com/cucumber/common/tree/messages/v16.0.0/messages).
  ([#1414](https://github.com/cucumber/cucumber/pull/1414)
   [aslakhellesoy])
   * Empty `string` properties are set to `""` rather than being omitted.
   * Empty `Array` properties are set to `[]` rather than being omitted.
   * The `seconds` property on `Timestamp` and `Diration` is now a `number` rather than a `string`.
* [Go, Java, JavaScript, Ruby] Packages and structs have changed:
  * [JavaScript]: Import with `import * as messages from '@cucumber/messages'`
  * [Ruby] Messages are now plain ruby hashes with camelCase symbol keys instead of objects with snake_case properties.

## [15.0.0] - 2021-03-23

### Added

* [All] Added tags to Rule node
    ([#1356](https://github.com/cucumber/cucumber/pull/1356) [sebrose], [gasparnagy], [brasmusson], [WannesFransen1994])

### Removed

* [JavaScript] moved code that depends on Node.js stream APIs to `@cucumber/message-streams`

### Fixed

* [Elixir] Make sure messages.proto is updated with ../messages.proto
* [Elixir] Generated new message modules based on the new messages.proto file

## [14.1.2] - 2021-03-23

### Fixed

* [JavaScript] revert breaking changes in 14.1.1
  ([#1437](https://github.com/cucumber/cucumber/issues/1437))

## [14.1.1] - 2021-03-22

### Fixed

* The 14.1.0 release failed half way through due to build script problems.

## [14.1.0] - 2021-03-22

### Added

* [All] Added tags to Rule node
    ([#1356](https://github.com/cucumber/cucumber/pull/1356) [sebrose], [gasparnagy], [brasmusson], [WannesFransen1994])

### Fixed

* [Elixir] Make sure messages.proto is updated with ../messages.proto
* [Elixir] Generated new message modules based on the new messages.proto file

## [14.0.1] - 2021-02-08

### Fixed

* [JavaScript] Remove `Long` from function signatures in `TimeConversion`

## [14.0.0] - 2021-02-05

### Changed

* [JavaScript] The stream classes have to be imported separately:
  `import { MessageToBinaryStream, MessageToNdjsonStream, BinaryToMessageStream, NdjsonToMessageStream} from '@cucumber/messages/dist/src/stream'`
  ([#1331](https://github.com/cucumber/cucumber/issues/1331))
* In JavaScript, Int64 fields are now typed as `number`, rather than `number|Long`

### Fixed

* [JavaScript] removed circular dependencies.
  ([#1292](https://github.com/cucumber/cucumber/pull/1292)
   [davidjgoss]
   [aslakhellesoy])

## [13.2.1] - 2020-11-19

### Fixed

* In case a line cannot be parsed as JSON, throw an error
  with the offending line in the exception message.

## [13.2.0] - 2020-11-12

### Added

* Elixir implementation
  ([#1175](https://github.com/cucumber/cucumber/pull/1175)
   [WannesFransen1994])

## [13.1.0] - 2020-09-14

### Added

* Add `Attachment#url`. This makes it possible to "detach" attachments so the main stream
  gets smaller and the attachments can be processed/downloaded separately with more ease.
  ([#1183](https://github.com/cucumber/cucumber/pull/1183)
   [aslakhellesoy])

### Fixed

* Ignore empty lines rather than throwing an error.

## [13.0.1] - 2020-08-07

### Fixed

* Release again since the 13.0.0 release didn't fully sync to subrepos

## [13.0.0] - 2020-08-07

### Changed

* Move `JavaMethod` and `JavaStackTraceElement` to be children of `SourceReference`

## [12.4.0] - 2020-07-31

### Added

* Suggested file name to the Attachment messages ([#1128](https://github.com/cucumber/cucumber/pull/1128))
* Added ProtocolVersion to access messages version reliably ([#1127](https://github.com/cucumber/cucumber/pull/1127) [mpkorstanje])

## [12.3.2] - 2020-07-29

### Fixed

* Release process for 12.3.1 failed

## [12.3.1] - 2020-07-29

### Fixed

* Release process for 12.3.0 failed

## [12.3.0] - 2020-07-29

### Added

* Add `JavaMethod` and `JavaStackTraceElement` as `SourceReference` ([#1120](https://github.com/cucumber/cucumber/pull/1120))

### Fixed

* [Ruby] Fix computing of Timestamp (see [cucumber-ruby#1438](https://github.com/cucumber/cucumber-ruby/issues/1438))

## [12.2.0] - 2020-06-26

### Added

* Added field `ci` to `Meta` message.

## [12.1.1] - 2020-04-21

### Fixed

* [Ruby] Add `VERSION` file to gem, so `Messages::Envelope::VERSION` works

## [12.1.0] - 2020-04-21

### Added

* Expose the library version through the API
  * Java: `io.cucumber.messages.Messages.Envelope.class.getPackage().getImplementationVersion()`
  * Ruby: `Messages::Envelope::VERSION`
  * JavaScript: `import { version } from '@cucumber/messages'`
* Add `Meta` message
  ([#976](https://github.com/cucumber/cucumber/pull/976)
   [aslakhellesoy])
* [Java] Upgrade to `cucumber-parent:2.1.0` (needed to expose library version)
 ([#976](https://github.com/cucumber/cucumber/pull/976)
  [aslakhellesoy])

## [12.0.0] - 2020-04-14

### Added

* Add `id` field to `Background`, `Rule` and `Examples`. Needed for search engine indexing.

### Changed

* Some messages have been nested under other messages (removal of other messages)
  made it possible to scope them more locally

### Removed

* Several messages that weren't used have been removed
  ([#962](https://github.com/cucumber/cucumber/pull/962)
   [#951](https://github.com/cucumber/cucumber/issues/951)
   [aslakhellesoy])

### Fixed

* Ignore unknown fields when parsing JSON. This is to ensure forward and backward
  compatibility when using JSON encoding (NDJSON).
  ([#959](https://github.com/cucumber/cucumber/pull/959)
   [#957](https://github.com/cucumber/cucumber/pull/957)
   [aslakhellesoy]
   [mpkorstanje])

## [11.1.1] - 2020-03-30

### Fixed

* The [#932](https://github.com/cucumber/cucumber/pull/932) pull request wasn't actually
  included in 11.1.0

## [11.1.0] - 2020-03-30

### Added

* [JavaScript] Add `#addDurations` function to `TimeConversion`
  ([#932](https://github.com/cucumber/cucumber/pull/932)
   [charlierudolph])

## [11.0.1] - 2020-03-30

### Fixed

* Release process

## [11.0.0] - 2020-03-30

### Changed

* `Attachment#text` and `Attachment#binary` have been replaced with `Attachment#body`,
  and `Attachment#content_encoding` has been added.
  ([#947](https://github.com/cucumber/cucumber/pull/947)
   [aslakhellesoy])

## [10.0.3] - 2020-03-05

### Fixed

* 10.0.2 release process failed.

## [10.0.2] - 2020-03-02

### Fixed

* [JavaScript] make stream readable/writable object modes explicit. Better buffer handling.
* [Ruby] Don't depend on the `json` gem, since it only installs on Windows with
  a C compiler toolchain. The `json` gem is part of the Ruby stdlib.
* [Go] Increase max size of a JSON message to 10Mb
  ([#901](https://github.com/cucumber/cucumber/issues/901)
   [#903](https://github.com/cucumber/cucumber/pull/903)
   [aslakhellesoy])

## [10.0.1] - 2020-02-13

### Fixed

* The 10.0.0 release failed.

## [10.0.0] - 2020-02-13

### Added

* Add `UndefinedParameterType`
  ([#890](https://github.com/cucumber/cucumber/pull/890)
   [aslakhellesoy])
* Add `TestCaseFinished#message`
  ([#890](https://github.com/cucumber/cucumber/pull/890)
   [aslakhellesoy])

### Changed

* Rename `TestResult` to `TestStepResult`
  ([#890](https://github.com/cucumber/cucumber/pull/890)
   [aslakhellesoy])

### Fixed

* Ruby: Fixed rounding errors in `TimeConversion`

## [9.0.3] - 2020-01-10

### Fixed

* Ruby: Fix inclusion of generated lib/messages.pb.rb

## [9.0.2] - 2020-01-10

* Ruby: Fix error in gemspec

## [9.0.1] - 2020-01-09

### Fixed

* Fixed release scripts for Go and JavaScript

## [9.0.0] - 2020-01-09

### Added

* Added `ParameterType` as an envelope message

### Changed

* Renamed module name from `cucumber-messages` to `messsages`
  ([#850](https://github.com/cucumber/cucumber/pull/850)
   [aslakhellesoy])
* Use pure Ruby protobuf in order to avoid problems with Ruby 2.7.0 and JRuby.
  ([#813](https://github.com/cucumber/cucumber/pull/813)
   [#843](https://github.com/cucumber/cucumber/issues/843)
   [mvz]
   [aslakhellesoy])
* A `TestCase` now has a list of `StepMatchArgumentsList` rather than a list of `StepMatchArgument`.
  This allows a `TestCase` to hold matches from more than one `StepDefinition`, which is possible
  in the case of ambiguous matches.
* Renamed `content_type` fields to `media_type`
* Removed the `Media` message
* Attachments can have one of `string text` and `bytes binary` as the `body`

### Removed

* Removed `TestCase#test_result`. Aggregate results will be computed by `cucumber-query` instead

## [8.0.0] - 2019-12-10

### Added

* Added `testStepId` and `testCaseStartedId` to `Attachment`
  ([#814](https://github.com/cucumber/cucumber/pull/814)
   [charlierudolph])
* Added new classes for working with NDJSON streams
* Added new `TimeConversion` utilities for converting between protobuf `Timestamp/Duration` and the
  platform's representation of timestamps (clock time) and duration (monotonic time)

### Changed

* Renamed some of the classes for dealing with streams

## [7.0.0] - 2019-11-14

### Added

* Support retry
  ([#722](https://github.com/cucumber/cucumber/pull/722)
   [charlierudolph])

### Changed

* Added more reference ids and removed deprecated/reserved fields
  ([#790](https://github.com/cucumber/cucumber/pull/790)
   [#794](https://github.com/cucumber/cucumber/pull/794)
   [vincent-psarga]
   [aslakhellesoy])

## [6.0.2] - 2019-10-16

* [Java] Fix shading of `com.google.protobuf.util`

## [6.0.1] - 2019-10-03

### Fixed

* [Go] Release 6.0.0 is unusable.

## [6.0.0] - 2019-10-02

### Added

* New `TestStepMatched` message
* `Duration` message to express duration in a seconds + nano format
* field `duration` in `TestResult` message

### Changed

* Renamed `PatternMatch` to `StepMatchArgument`
* Renamed `CommandRunTestStep#patternMatches` to `CommandRunTestStep#stepMatchArguments`
* Replace Google's Timestamp by our own message

### Removed

* `durationNanoSeconds` field in `TestResult` message

## [5.0.1] - 2019-08-23

### Fixed

* [Go] Fix module version (5.0.0 left it at v4)

## [5.0.0] - 2019-08-23

### Changed

* The ordinal numbers of the `Status` enum have changed, to easier compute an
  aggregated status.

### Fixed

* [JavaScript] Don't swallow exceptions happening in `ProtobufMessageStream`

## [4.0.0] - 2019-08-14

* [Go] Append v4 to go module name to comply with the go.mod spec

## [3.0.5] - 2019-08-14

### Fixed

* [Go] Tag the cucumber/messages-go subrepo (again)

## [3.0.4] - 2019-08-14

### Fixed

* [Go] Tag the cucumber/messages-go subrepo (again)

## [3.0.3] - 2019-08-14

### Fixed

* [Go] Tag the cucumber/messages-go subrepo

## [3.0.2] - 2019-08-01

### Added

* Add Timestamp property and comments to TestRunFinished message
  ([#665](https://github.com/cucumber/cucumber/pull/665)
   [SabotageAndi]

## [3.0.1] - 2019-07-15

### Added

* [.NET] Publish NuGet package
  ([#635](https://github.com/cucumber/cucumber/pull/635)
   [SabotageAndi]
   [aslakhellesoy]
   [vincent-psarga])

## [3.0.0] - 2019-06-05

### Added
* Added `TestRunStarted#timestamp` field
  ([#615](https://github.com/cucumber/cucumber/pull/615)
   [david1995])
* Added `TestCaseStarted#platform` field
  ([#626](https://github.com/cucumber/cucumber/pull/626)
   [#616](https://github.com/cucumber/cucumber/pull/616)
   [david1995])

### Changed
* Use an enum for the `encoding` field.
* Misc changes for `cucumber-engine`
  ([#549](https://github.com/cucumber/cucumber/pull/549))

### Deprecated

### Removed

### Fixed

## [2.1.2] - 2019-03-29

### Fixed

* Fix Project struggling to build across JRuby and Ruby 2.6
  ([#578](https://github.com/cucumber/cucumber/pull/578)
  [luke-hill])

## [2.1.1] - 2018-11-02

### Fixed

* Release process improvements

## [2.1.0] - 2018-11-01

### Added

* Add testResult to the TestCaseFinished message
  ([#488](https://github.com/cucumber/cucumber/pull/488)
   [brasmusson])

## [2.0.0] - 2018-10-14

### Added

* Several messages to support [cucumber-engine]()
  ([#502](https://github.com/cucumber/cucumber/pull/502)
   [charlierudolph])

## [1.1.2] - 2018-10-01

### Added

* Added `TestHookStarted` and `TestHookFinished` to distinguish between messages about Gherkin steps and hooks
  ([aslakhellesoy])

## [1.0.0] - 2018-09-15

### Added

* Protobuf messages for Go, Java, JavaScript, TypeScript and Ruby

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/messages/v17.0.0...main
[17.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v16.0.1...messages/v17.0.0
[16.0.1]:      https://github.com/cucumber/cucumber/compare/messages/v16.0.0...messages/v16.0.1
[16.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v15.0.0...messages/v16.0.0
[15.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v14.1.2...messages/v15.0.0
[14.1.2]:      https://github.com/cucumber/cucumber/compare/messages/v14.0.1...messages/v14.1.2
[14.1.1]:      https://github.com/cucumber/cucumber/compare/messages/v14.1.0...messages/v14.1.1
[14.1.0]:      https://github.com/cucumber/cucumber/compare/messages/v14.0.1...messages/v14.1.0
[14.0.1]:      https://github.com/cucumber/cucumber/compare/messages/v14.0.0...messages/v14.0.1
[14.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v13.2.1...messages/v14.0.0
[13.2.1]:      https://github.com/cucumber/cucumber/compare/messages/v13.2.0...messages/v13.2.1
[13.2.0]:      https://github.com/cucumber/cucumber/compare/messages/v13.1.0...messages/v13.2.0
[13.1.0]:      https://github.com/cucumber/cucumber/compare/messages/v13.0.1...messages/v13.1.0
[13.0.1]:      https://github.com/cucumber/cucumber/compare/messages/v13.0.0...messages/v13.0.1
[13.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v12.4.0...messages/v13.0.0
[12.4.0]:      https://github.com/cucumber/cucumber/compare/messages/v12.3.2...messages/v12.4.0
[12.3.2]:      https://github.com/cucumber/cucumber/compare/messages/v12.3.1...messages/v12.3.2
[12.3.1]:      https://github.com/cucumber/cucumber/compare/messages/v12.3.0...messages/v12.3.1
[12.3.0]:      https://github.com/cucumber/cucumber/compare/messages/v12.2.0...messages/v12.3.0
[12.2.0]:      https://github.com/cucumber/cucumber/compare/messages/v12.1.1...messages/v12.2.0
[12.1.1]:      https://github.com/cucumber/cucumber/compare/messages/v12.1.0...messages/v12.1.1
[12.1.0]:      https://github.com/cucumber/cucumber/compare/messages/v12.0.0...messages/v12.1.0
[12.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v11.1.1...messages/v12.0.0
[11.1.1]:      https://github.com/cucumber/cucumber/compare/messages/v11.1.0...messages/v11.1.1
[11.1.0]:      https://github.com/cucumber/cucumber/compare/messages/v11.0.1...messages/v11.1.0
[11.0.1]:      https://github.com/cucumber/cucumber/compare/messages/v11.0.0...messages/v11.0.1
[11.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v10.0.3...messages/v11.0.0
[10.0.3]:      https://github.com/cucumber/cucumber/compare/messages/v10.0.2...messages/v10.0.3
[10.0.2]:      https://github.com/cucumber/cucumber/compare/messages/v10.0.1...messages/v10.0.2
[10.0.1]:      https://github.com/cucumber/cucumber/compare/messages/v10.0.0...messages/v10.0.1
[10.0.0]:      https://github.com/cucumber/cucumber/compare/messages/v9.0.3...messages/v10.0.0
[9.0.3]:      https://github.com/cucumber/cucumber/compare/messages/v9.0.2...messages/v9.0.3
[9.0.2]:      https://github.com/cucumber/cucumber/compare/messages/v9.0.1...messages/v9.0.2
[9.0.1]:      https://github.com/cucumber/cucumber/compare/messages/v9.0.0...messages/v9.0.1
[9.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v8.0.0...messages/v9.0.0
[8.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v7.0.0...cucumber-messages/v8.0.0
[7.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v6.0.2...cucumber-messages/v7.0.0
[6.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v6.0.1...cucumber-messages/v6.0.2
[6.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v6.0.0...cucumber-messages/v6.0.1
[6.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v5.0.1...cucumber-messages/v6.0.0
[5.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v5.0.0...cucumber-messages/v5.0.1
[5.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v4.0.0...cucumber-messages/v5.0.0
[4.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.5...cucumber-messages/v4.0.0
[3.0.5]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.4...cucumber-messages/v3.0.5
[3.0.4]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.3...cucumber-messages/v3.0.4
[3.0.3]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.2...cucumber-messages/v3.0.3
[3.0.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.1...cucumber-messages/v3.0.2
[3.0.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v3.0.0...cucumber-messages/v3.0.1
[3.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.2...cucumber-messages/v3.0.0
[2.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.1...cucumber-messages/v2.1.2
[2.1.1]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.1.0...cucumber-messages/v2.1.1
[2.1.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v2.0.0...cucumber-messages/v2.1.0
[2.0.0]:      https://github.com/cucumber/cucumber/compare/cucumber-messages/v1.1.2...cucumber-messages/v2.0.0
[1.1.2]:      https://github.com/cucumber/cucumber/compare/cucumber-messages-v1.0.0...cucumber-messages/v1.1.2
[1.0.0]:      https://github.com/cucumber/cucumber/releases/tag/cucumber-messages-v1.0.0

<!-- Contributors in alphabetical order -->
[aslakhellesoy]:    https://github.com/aslakhellesoy
[brasmusson]:       https://github.com/brasmusson
[charlierudolph]:   https://github.com/charlierudolph
[david1995]:        https://github.com/david1995
[luke-hill]:        https://github.com/luke-hill
[mpkorstanje]:      https://github.com/mpkorstanje
[mvz]:              https://github.com/mvz
[SabotageAndi]:     https://github.com/SabotageAndi
[vincent-psarga]:   https://github.com/vincent-psarga
