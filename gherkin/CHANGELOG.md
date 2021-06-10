# CHANGE LOG

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org).

This document is formatted according to the principles of [Keep A CHANGELOG](http://keepachangelog.com).

----
## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed
* [Ruby] Rules weren't inheriting the relevant tags during the Gherkin Query stage (Where it caches the NodeID)
  ([#1593](https://github.com/cucumber/cucumber/pull/1593) [luke-hill])

* MDG parser correctly removes leading space from content in DocStrings

## [19.0.3] - 2021-05-24

### Fixed

* MDG files must use the `.feature.md` extension.
* Data Tables and Examples Tables in Markdown *must* be indented 2-5 spaces in order to
  be recognised.

## [19.0.2] - 2021-05-19

### Fixed

* Upgrade to `@cucumber/message-streams` `^2.0.0`
* Upgrade berp to 1.3.0 (parser behavior not changed)
  ([#1542](https://github.com/cucumber/common/pull/1542)
   [gasparnagy])

## [19.0.1] - 2021-05-17

### Fixed

* [Perl]   Updated to pass acceptance tests.
  ([#1552](https://github.com/cucumber/common/pull/1552) [ehuelsmann])

## [19.0.0] - 2021-05-15

### Added

* [JavaScript] Experimental support for Markdown. See [MARKDOWN_WITH_GHERKIN.md](./MARKDOWN_WITH_GHERKIN.md)
  ([#1209](https://github.com/cucumber/common/pull/1209)
   [aslakhellesoy])

### Changed

* [DotNet] Replaced Utf8Json with source-embedded TinyJson.
  ([#511](https://github.com/cucumber/cucumber/pull/1511)
   [gasparnagy])   

* Update Dutch translation of the "Rule" keyword.
  ([#1513](https://github.com/cucumber/common/pull/1513)
   [OrhanTozan])

* Update Russian translation of the "Scenario Outline" keyword.
  ([#1499](https://github.com/cucumber/cucumber/pull/1499)
   [hkosova])

* Update Hungarian translation of the "Rule" keyword.
  ([#1518](https://github.com/cucumber/cucumber/pull/1518)
   [gasparnagy])

* [Go, Java, JavaScript, Ruby] Upgrade to messages 16.0.0: this may have a big impact on APIs.
  Please see [messages/CHANGELOG.md](https://github.com/cucumber/common/blob/master/messages/CHANGELOG.md#1600---2021-05-15) for more details.

### Removed

* [Elixir] The package was not released - it needs to be updated to pass acceptance tests.
* [Perl]   The package was not released - it needs to be updated to pass acceptance tests.

### Fixed

* [Perl] Reinstate Perl 5.10.1 compatibility.
  ([#1495](https://github.com/cucumber/cucumber/pull/1495)
   [#1494](https://github.com/cucumber/cucumber/issues/1494)
   [ehuelsmann])

* [DotNet] Fixed .NET Gherkin compatibility with other Gherkin implementations.
  ([#511](https://github.com/cucumber/cucumber/pull/1511)
   [gasparnagy])   

## [18.1.1] - 2021-04-22

### Fixed

* [python] Run gherkin as a module.
  ([#1480](https://github.com/cucumber/cucumber/pull/1480)
   [#1475](https://github.com/cucumber/cucumber/issues/1475)
   [brasmusson] [aurelien-reeves])

## [18.1.0] - 2021-04-06

### Added

* Python implementation re-enabled, with support for `Rule` keyword.
  ([#1449](https://github.com/cucumber/cucumber/pull/1449)
   [brasmusson])

### Fixed

* Update translation of `Rule` in Czech.
  ([#1442](https://github.com/cucumber/cucumber/pull/1442)
   [plavcik])

## [18.0.0] - 2021-03-24

### Added

* [Perl] New APIs to spawn message streams: `Gherkin->from_paths` and
    `Gherkin->from_source`
    ([#1359](https://github.com/cucumber/cucumber/pull/1359) [ehuelsmann])
* [All] Rules can be tagged. Scenarios that belong to the rule "inherit" the rule tags.
    ([#1356](https://github.com/cucumber/cucumber/pull/1356) [sebrose], [gasparnagy], [brasmusson], [WannesFransen1994])
* [Perl] DOS line endings support on all platforms (not just DOS/Windows) ([ehuelsmann])

### Changed

* [Perl] Release engineering changes to make it non-interactive, update
    CHANGELOG.md correctly
    ([#1350](https://github.com/cucumber/cucumber/pull/1350))
    [ehuelsmann]

### Removed

* [JavaScript] the `GherkinStreams` export has moved from `@cucumber/gherkin` to `@cucumber/gherkin-streams`
* [JavaScript] the `gherkin-javascript` executable has moved to the new `@cucumber/gherkin-streams` npm module

## [17.0.2] - 2021-02-16

### Fixed

* [Perl] Release archive too large (8MB -> <100kB)
    ([#1350](https://github.com/cucumber/cucumber/pull/1350))
    [ehuelsmann]
* [Perl] Minimum Perl version (5.10.1) incorrectly declared, leading
    to CPANTESTERS failures
    ([#1350](https://github.com/cucumber/cucumber/pull/1350))
    [ehuelsmann]
* [Perl] Kwalitee (Perl release quality checker) complaints/errors
    ([#1350](https://github.com/cucumber/cucumber/pull/1350))
    [ehuelsmann]

## [17.0.1] - 2021-02-08

### Fixed

* Fix building of MacOS (darwin) executables.
  ([#1347](https://github.com/cucumber/cucumber/issues/1347)
   [#1348](https://github.com/cucumber/cucumber/pull/1348)
   [aslakhellesoy]
   [ciaranmcnulty])

## [17.0.0] - 2021-02-07

### Changed
* [JavaScript] the `GherkinStreams` object is not longer loaded by default.
  This makes it possible to use the library in a browser without a polyfill.
  To upgrade, use `import GherkinStreams from '@cucumber/gherkin/dist/src/stream/GherkinStreams'` instead of `import { GherkinStreams } from 'gherkin'`.
  ([#1333](https://github.com/cucumber/cucumber/pull/1333))
* [Perl] Fully overhauled implementation, moving it up from 4.0.0
  ([#711](https://github.com/cucumber/cucumber/pull/711),
   [#1286](https://github.com/cucumber/cucumber/pull/1286)) [ehuelsmann]

### Removed
* [JavaScript] remove `IGherkinOptions#createReadStream`. This function was introduced in `9.1.0`
  in order to decouple this lib from the Node.js `fs` library. This decoupling was improved in
  [#1333](https://github.com/cucumber/cucumber/pull/1333) which made it obsolete.  
  (Fixes [#1284](https://github.com/cucumber/cucumber/issues/1284)

### Fixed
* Use Spanish translation for the "Rule" keyword and for the "Feature" synonym keywords
  ([#1360](https://github.com/cucumber/cucumber/pull/1360)
   [sergioforerogomez])
* Use Italian translation for the "Rule" keyword and for the "Feature" synonym keywords
  ([#1318](https://github.com/cucumber/cucumber/pull/1318)
   [mgiustiniani])
* Use Swedish translation for the "Rule" keyword
  ([#1297](https://github.com/cucumber/cucumber/pull/1297)
   [johnknoop])
* Elixir implementation - make sure the gherkin_languages.json is added with the release package.
  ([#1293](https://github.com/cucumber/cucumber/pull/1293)
   [WannesFransen1994])
* [JavaScript] removed circular dependencies.
  ([#1292](https://github.com/cucumber/cucumber/pull/1292)
   [davidjgoss]
   [aslakhellesoy])

## [16.0.0] - 2020-12-10

### Added

* [Elixir] New implementation!
  ([#1251](https://github.com/cucumber/cucumber/pull/1251)
   [WannesFransen1994])

### Changed

* Telugu now uses the correct 639-1 code - `te` instead of `tl`.
  ([#1238](https://github.com/cucumber/cucumber/pull/1238)
   [#1221](https://github.com/cucumber/cucumber/issues/1221)
   [nvmkpk])

### Removed

* [JavaScript] The `Query` class has been removed from this library, and has been added to `@cucumber/gherkin-utils`

## [15.0.2] - 2020-08-17

### Fixed

* Revert removal of Gherkin keywords from 15.0.1

## [15.0.1] - 2020-08-12

Do not use this release. The removal of Gherkin keywords breaks backwards compatibility for Creole and French,
and this should have been released as a major release. The keywords are restored in 15.0.2, and we'll remove them
again in a future major release.

### Removed

* Remove keyword aliases that only differ by letter case (French, Creole).
  The reason for this is that Cucumber-JVM generates annotation classes for each
  step keyword, and some file systems are case insensitive. This led to inconsistencies
  in the classes that were generated during the build. Removing these keywords fixes
  this problem. Theoretically this should trigger a new major release, but because the
  change is so minor and will affect very few users we've made this a patch release.

## [15.0.0] - 2020-08-07

### Changed

* Update `messages` to 13.0.1

## [14.2.0] - 2020-07-31

### Changed

* Update `messages` to 12.4.0

## [14.1.0] - 2020-07-29

### Changed

* Update `messages` to 12.3.2

## [14.0.2] - 2020-06-29

### Fixed
* [JavaScript] Actually merge #1094 - it wasn't done in 14.0.1
* [JavaScript] Throw NoSuchLanguageException when language is unknown #1102
  ([#1102](https://github.com/cucumber/cucumber/pull/1102/)
   [mpkorstanje])
## [14.0.1] - 2020-06-29

### Fixed

* [JavaScript] Remove test code from exports
  ([#1094](https://github.com/cucumber/cucumber/pull/1094/)
   [aslakhellesoy])

## [14.0.0] - 2020-06-27

### Added

* [Java] Enable consumers to find our version at runtime using `clazz.getPackage().getImplementationVersion()` by upgrading to `cucumber-parent:2.1.0`
  ([#976](https://github.com/cucumber/cucumber/pull/976)
   [aslakhellesoy])
* [Java/Ruby/Go/Javascript] Add tests to ensure we do not delete whitespace inside a table cell
  ([#769](https://github.com/cucumber/cucumber/pull/769)
   [mpkorstanje]
   [vincent-psarga])

### Changed

* Upgrade to messages 12.2.0
* [Ruby] gherkin-query: if a feature file is empty, do not update anything.
  ([cucumber-ruby#1427](https://github.com/cucumber/cucumber-ruby/issues/1427)
   [vincent-psarga])
* [JavaScript] Change gherkinQuery API:
  * `getPickleIds`: now takes a URI and an `astNodeId` to find the pickle ids instead of a line number
  * `getPickleStepIds`: now takes an `astNodeId` parameter instead of a URL and a line number to locate the pickle step id
  * expose `parse` and `parseAndCompile` utilities
* Fixed Estonian translation of "Rule" ([#973](https://github.com/cucumber/cucumber/pull/973) [ookull])
* Fixed Estonian translation of "Scenario Outline" ([#972](https://github.com/cucumber/cucumber/pull/972) [ookull])

### Fixed

* [JavaScript] Update `gherkin-languages.json`, which hadn't been updated for a few versions (not sure for how long!)
* [Ruby] Fix the default constructor of `Gherkin::Parser`
  ([#1074](https://github.com/cucumber/cucumber/issues/1074)
   [aslakhellesoy])
* [Ruby] Use `require_relative` for internal requires ([#1010](https://github.com/cucumber/cucumber/pull/1010) [deivid-rodriguez])
* [Javascript] Escape regex characters in table header ([#1077](https://github.com/cucumber/cucumber/pull/1077) [mpkorstanje])

## [13.0.0] - 2020-04-14

### Changed

* Upgrade to messages 12.0.0

## [12.0.0] - 2020-03-31

### Added

* [JavaScript] New exports:
  * `Parser`
  * `compile`
  ([#924](https://github.com/cucumber/cucumber/pull/924)
   [davidjgoss])
* [JavaScript] Add `Query#getPickles()`
* [JavaScript] Export `compile` function for compiling `Pickles`

### Changed

* Upgrade to messages 11.x
* [JavaScript] The default export has been removed. Replaced with:
  * `import { GherkinStreams } from 'gherkin'` to use the `fromPaths`, `fromStream`  and `fromSources` functions
  * `import { dialects } from 'gherkin'` to access dialects
* [JavaScript] `Dialect` properties are read only
* [JavaScript] `fromPaths`, `fromStream` and `fromSources` now use `ReadOnlyArray` to
  prevent modifying the passed array.

### Fixed

* [JavaScript] `Gherkin.fromPaths` is not a function
  ([#857](https://github.com/cucumber/cucumber/issues/857)
   [#949](https://github.com/cucumber/cucumber/pull/949)
   [aslakhellesoy])

## [11.0.0] - 2020-03-02

### Changed

* [JavaScript] Renamed `GherkinQuery` to `Query`

### Removed

* [JavaScript] Removed `StrictMap` and `StrictArrayMultiMap`

### Fixed

* Update Indonesian Gherkin Language
  ([#872](https://github.com/cucumber/cucumber/pull/872)
   [#KniveX])

## [10.0.0] - 2020-02-13

### Changed

* Upgrade to messages v10.0.1

### Fixed
 * [Java/JavaScript/Go/Ruby] Fix parsing of commented tags
     ([880](https://github.com/cucumber/cucumber/pull/880),
      [721](https://github.com/cucumber/cucumber/pull/721)
      [mpkorstanje])
* [JavaScript] `Gherkin#fromPaths` emits an error if a path can't be read (for example if it is a directory)
* [Java/JavaScript/Ruby/Go]  Escape triple backticks in alternative docstring
  ([#889](https://github.com/cucumber/cucumber/pull/889)
   [mpkorstanje])

## [9.2.0] - 2020-01-22

### Added

* [JavaScript] Add `getGherkinDocuments(): messages.IGherkinDocument[]`
* [JavaScript] Add `getPickleStepIds(uri: string, lineNumber: number): string[]``

### Changed

* [JavaScript] Change signature of `getPickleIds(uri: string, lineNumber?: number): string[]` - `lineNumber` is optional
* [JavaScript] `getPickleIds` only operates on pickles, and not on pickle steps

## [9.1.0] - 2020-01-10

### Added

* [Ruby] Added `Gherkin::Query` that provides `Location` for various AST nodes.
  ([#845](https://github.com/cucumber/cucumber/pull/845)
   [aslakhellesoy]
   [mattwynne]
   [vincent-psarga])

### Changed

* Upgrade to `messages` `9.0.1`
* [JavaScript] the `Gherkin#fromStream`, `Gherkin#fromPaths` and `Gherkin#fromSources` functions'
  `options` argument is no longer optional, and it *must* have a `createReadStream` property.
  The reason for this is to decouple the library from Node's `fs` module so it can be packaged with
  Webpack and be used in a browser.

## [9.0.0] - 2019-12-10

### Changed

* Renamed `--json` command line option to `--format protobuf|ndjson`
* Upgrade to `cucumber-messages` `8.0.0`

## [8.2.1] - 2019-11-22

### Fixed

* Do not trim leading newlines
  ([#891](https://github.com/cucumber/cucumber/pull/891)
   [mpkorstanje])

* PickleStep have unique IDs when generated from a `Background` section
  ([#800](https://github.com/cucumber/cucumber/pull/800)
   [vincent-psarga])

## [8.2.0] - 2019-11-14

### Fixed

* [Ruby] Make CI build work on Ruby 2.3, 2.4, 2.5 and 2.6
  ([#777](https://github.com/cucumber/cucumber/pull/777)
   [vincent-psarga]
   [aslakhellesoy])

## [8.1.1] - 2019-10-17

### Fixed

* [Ruby] Replace internal `ProtobufMessageStream` with `ProtobufIoEnumerator`

## [8.1.0] - 2019-10-16

### Added

* Better Indonesian translation
  ([#733](https://github.com/cucumber/cucumber/pull/733)
   [milhcbt])
* New Nepali translation
  ([#729](https://github.com/cucumber/cucumber/pull/729)
   [ankitpokhrel])
* New Marathi keywords
  ([#731](https://github.com/cucumber/cucumber/pull/731)
   [#758](https://github.com/cucumber/cucumber/pull/758)
   [upgundecha])

### Changed

* [Java] restore native Java parser
  ([#750](https://github.com/cucumber/cucumber/pull/750)
   [aslakhellesoy])

### Removed

* [JavaScript] - `GherkinExe` (after it was fixed)

### Fixed

* [JavaScript] - `GherkinExe` exposes `stderr`
  ([#723](https://github.com/cucumber/cucumber/pull/723)
   [charlierudolph])

## [8.0.0] - 2019-10-03

### Added

* New keywords for German
  ([#352](https://github.com/cucumber/cucumber/pull/352)
   [#707](https://github.com/cucumber/cucumber/issues/707)
   [#708](https://github.com/cucumber/cucumber/pull/708)
   [coderbyheart]
   [Haukinger])

### Changed

* Upgrade cucumber-messages to 6.0.1
* [JavaScript] restore native JavaScript parser
  ([#709](https://github.com/cucumber/cucumber/pull/709)
   [#689](https://github.com/cucumber/cucumber/pull/689)
   [badeball]
   [aslakhellesoy])
* [Ruby] restore native ruby parser
  ([#702](https://github.com/cucumber/cucumber/pull/702) [brasmusson])

### Fixed

* [Go, Ruby] Fix trimming of whitespace in example cells
  ([#703](https://github.com/cucumber/cucumber/pull/703) [aslakhellesoy])

## [7.0.4] - 2019-08-29

### Changed

* Upgrade to cucumber-messages 5.0.1

## [7.0.3] - 2019-08-15

### Fixed

* [Ruby] Fix inclusion of gherkin executables

## [7.0.2] - 2019-08-14

### Changed

* Upgrade to c21e 2.0.0

## [7.0.1] - 2019-08-14

### Fixed

* The 7.0.0 release failed

## [7.0.0] - 2019-08-14

### Added

* [TypeScript] dialect support
  ([#597](https://github.com/cucumber/cucumber/pull/597)
   [charlierudolph]
   [aslakhellesoy])
* Populate the `Pickle#id` field with a SHA1 hash of the source + line + column.

### Fixed

* [TypeScript] ExeFile not a constructor
  ([#641](https://github.com/cucumber/cucumber/pull/641)
   [#634](https://github.com/cucumber/cucumber/issues/634)
   [joscha])

* [Java,TypeScript] Fix parsing of long documents.
  ([#566](https://github.com/cucumber/cucumber/issues/566)
   [aslakhellesoy])

## [6.0.17] - 2019-03-31

### Changed

* Upgrade to cucumber-messages 2.1.2

## [6.0.15] - 2018-10-31

### Added
* (Go) Executables are uploaded to GitHub releases.

### Fixed
* Fix bug where leading tabs prevented parser from identifying keywords
  ([#512](https://github.com/cucumber/cucumber/pull/512) [VjacheslavVytjagov])
* [JavaScript] Fix JavaScript build
  ([#499](https://github.com/cucumber/cucumber/pull/499)
   [noisygerman])

## [6.0.13] - 2018-09-25

This major release aligns Gherkin with [Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction),
a collaborative technique for *designing* scenarios and discovering details
about rules and behaviour.

A new `Rule` keyword has been introduced, and acts as a grouping of one or more
`Example`s - a new synonym for `Scenario`. The `Scenario Outline` keyword can now
be interchanged with the `Scenario` keyword, which makes Gherkin a little less confusing,
especially to beginners. These are the first major change to the
Gherkin grammar in 8 years or so, and we're pretty excited about them. We hope they will
guide people towards thinking of scenarios as *examples of business rules*
rather than a series of form submissions and link clicking. This rule-focused
style engages product owners, and can act as amazing living documentation of your
product. It opens up for the true benefits of BDD - a business-friendly format
for describing and agreeing on software behaviour, and a guide to development.
Developers will code against this spec, and produce better (simpler) software faster.
The software will do what it says on the tin.

The new Gherkin grammar is backwards compatible, meaning that existing Gherkin
documents are still valid.

The library API however is not backwards compatible. It is now a stream-like
API which produces a stream of messages (source, AST and pickle messages).

Internally, each library shells out to a go executable (embedded in the library for all major
OSes and processor architectures), and communicates via STDIN/STDOUT using
[protocol buffers](https://developers.google.com/protocol-buffers/). The rationale
behind this architectural change is to reduce the maintenance burden (a single parser
rather than a dozen), but also to make it quicker and easier to implement a Gherkin
library in a new language. Just generate some protobuf classes/structs and write a
small program that shells out and communicates using those messages.

Our preliminary benchmarks suggest that performance is comparable to the native implementations,
or better. There is a small hit in startup cost, but this is offset against a higher throughput
of the parser.

At the time of this writing Gherkin 6 is nearly integrated in Cucumber-JVM and
Cucumber-Ruby. Integration with Cucumber.js has not started and we would really
welcome some help with that.

The message protocol will continue to evolve to represent runtime information such
as results, parameter types, cucumber expressions and other metadata. This will
make it easier for the community to build plugins for Cucumber. One HTML Gherkin
formatter to rule them all. Statistic plugins and more.

### Added
* (TypeScript) - Added TypeScript definitions (`.d.ts`) for Gherkin.
* Added `Rule` keyword
  ([#250](https://github.com/cucumber/cucumber/issues/250)
   [aslakhellesoy])
* Added `Example` as synonym for `Scenario` in English and many other languages.
  This is to align Gherkin with BDD and Example Mapping terminology.
  ([aslakhellesoy])
* Added `Ukoliko` as an additional synonym for `Given`, in Croatian.
  ([#480](https://github.com/cucumber/cucumber/pull/480)
   [banovotz](https://github.com/banovotz))

### Changed
* (JavaScript,Java,Ruby) The native parsers are removed. Parsing is done by `gherkin-go`
  executables which are bundled with the published libraries.
  ([aslakhellesoy], [jaysonesmith])
* (JavaScript,Java,Ruby,Go) `Scenario` keyword (or `Example` keyword) can be used to create `Scenario Outline`.
  ([#353](https://github.com/cucumber/cucumber/pull/353) [aslakhellesoy])

### Removed
* (Java) OSGi support has been removed.
  ([#412](https://github.com/cucumber/cucumber/issues/412)
   [aslakhellesoy])

### Fixed

* (JavaScript) Fix ability to pass language to parser.
  ([#401](https://github.com/cucumber/cucumber/pull/401)
   [charlierudolph])

## [5.1.0] - 2018-05-30

### Added
* (.NET) - Better .NET Core support
* Support for Aragonese
  ([#298](https://github.com/cucumber/cucumber/pull/298)
   [danilat])
* (C) build a shared `libgherkin.so` library which allows Gherkin to be used
  as a library. (Cucumber.ml currently uses this.)
  ([cucumber/gherkin-c#6](https://github.com/cucumber/gherkin-c/pull/6)
   [cyocum])

### Changed
* Pass the content type of a docstring down into its pickle string form
  ([#292](https://github.com/cucumber/cucumber/pull/292)
   [rjwittams])
* Fixed Russian equivalents of `Given` and `Then`. ([#369](https://github.com/cucumber/cucumber/pull/369) [cerebellum13](https://github.com/cerebellum13))

### Fixed

* (C) Segfault when file does not exist
  ([#394](https://github.com/cucumber/cucumber/issues/394)
   [#395](https://github.com/cucumber/cucumber/pull/395)
   [cyocum])
* (JavaScript)
  ([#374](https://github.com/cucumber/cucumber/issues/374)
   [#377](https://github.com/cucumber/cucumber/pull/377)
   [charlierudolph])
* (Ruby, JavaScript) Remove berp.exe from packages
  ([#289](https://github.com/cucumber/cucumber/issues/289)
   [aslakhellesoy])
* (Go) fixes validation for go vet tool on latest versions
  ([#330](https://github.com/cucumber/cucumber/pull/330)
   [l3pp4rd])
* (Ruby) removed unneeded files from the gem

## [5.0.0] - 2017-10-13

### Added
* Ability to specify an initial language for the parser, so that the `# language` header isn't required
  ([#288](https://github.com/cucumber/cucumber/pull/288)
   by [charlierudolph] and [aslakhellesoy])
* A better wording for the Greek translation of `Scenario Outline` (`Περίγραμμα Σεναρίου`)
  ([#185](https://github.com/cucumber/cucumber/pull/185) by [pmatsinopoulos])
* Added female, singular `Given` in Romanian (`Dată fiind`)
  ([#202](https://github.com/cucumber/cucumber/pull/202) by [tsundberg])
* (C) CMake support
  ([#2](https://github.com/cucumber/gherkin-c/issues/2)
   [#3](https://github.com/cucumber/gherkin-c/pull/3)
   by [Pwera])

### Changed
* Compile empty scenarios to empty pickles
  ([#249](https://github.com/cucumber/cucumber/issues/249)
   [#264](https://github.com/cucumber/cucumber/pull/264)
   by [brasmusson])

## [4.1.3] - 2017-05-04

### Added
* (Go) Implement CLI
  ([#145](https://github.com/cucumber/cucumber/issues/145)
   [#162](https://github.com/cucumber/cucumber/pull/162)
   by [l3pp4rd])

### Fixed
* (JavaScript) Fix gherkin/javascript/examples so Gherkin loads in browser
  ([#197](https://github.com/cucumber/cucumber/pull/197)
   by [aslakhellesoy])
* (JavaScript) Don't depend on fs in the library
  ([#196](https://github.com/cucumber/cucumber/pull/196)
   by [aslakhellesoy])
* (Python) Fix executable
  ([#194](https://github.com/cucumber/cucumber/pull/194)
   [#157](https://github.com/cucumber/cucumber/issues/157)
   by [aslakhellesoy])
* (C) Fix Windows related issues
  ([#193](https://github.com/cucumber/cucumber/pull/193)
   [#168](https://github.com/cucumber/cucumber/issues/168)
   by [brasmusson])
* (C) Fix `uri` in pickles on C command line
  ([#176](https://github.com/cucumber/cucumber/pull/176)
   [#165](https://github.com/cucumber/cucumber/issues/165)
   by [brasmusson])
* (Go) Add missing error handling
  ([#170](https://github.com/cucumber/cucumber/pull/170)
   by [l3pp4rd])
* (Go) Fix build on go 1.8
  ([#137](https://github.com/cucumber/cucumber/issues/137)
   [#162](https://github.com/cucumber/cucumber/pull/162)
   by [l3pp4rd])
* (Python) Fix build on python 3.4
  ([#138](https://github.com/cucumber/cucumber/issues/138)
   [#158](https://github.com/cucumber/cucumber/pull/158)
   by [brasmusson])

## [4.1.2] - 2017-05-03
Something went wrong during this release - do not use

## [4.1.1] - 2017-03-16

### Added
* (JavaScript, Ruby, Python) Packages include executabled.
  ([#155](https://github.com/cucumber/cucumber/pull/155)
   by [aslakhellesoy])

### Fixed
* (Python) Python package 4.1.0 broken
  ([#153](https://github.com/cucumber/cucumber/issues/153)
   [#156](https://github.com/cucumber/cucumber/pull/156)
   by [aslakhellesoy])

## [4.1.0] - 2017-03-16

### Added
* (.NET, Java, JavaScript, Ruby, Python) Streaming API and command line client.
  ([#240](https://github.com/cucumber/gherkin/pull/240))
* (Java): Add accessors for languages and dialect keywords.
  ([#248](https://github.com/cucumber/gherkin/pull/248)
   by [brasmusson])
* (All): Add the language to the Pickles
  ([#251](https://github.com/cucumber/gherkin/pull/251)
   by [brasmusson])
* (C): New parser and compiler in C
  ([#187](https://github.com/cucumber/gherkin/pull/187)
   by [brasmusson])
* (I18n) mk-Cyrl/mk-Latn: Added Macedonian language
  ([#249](https://github.com/cucumber/gherkin/pull/249)
   by [nikolovski])
* (Build) Automate the version update for the sub-projects
  ([#211](https://github.com/cucumber/gherkin/pull/211)
   by [brasmusson])
* (Java) Make the jar a bundle to support execution in OSGi containers
  ([#221](https://github.com/cucumber/gherkin/pull/221)
   by [brasmusson])
* (Java) Using full path when loading gherkin-languages.json
  ([#225](https://github.com/cucumber/gherkin/pull/225)
   by [mauriciotogneri])
* (I18n) ru: Added word "Затем" as a synonym for when steps
  ([#246](https://github.com/cucumber/gherkin/pull/246)
   by [dobiedad])
* (I18n) Georgian language
  ([#218](https://github.com/cucumber/gherkin/pull/239)
   by [Pr-Mex])
* (I18n) nl: Added "Wanneer" as a synonym for when steps
  ([#218](https://github.com/cucumber/gherkin/pull/241)
   by [jmezach])
* (I18n) ast: Add Asturian translation
  ([#209](https://github.com/cucumber/gherkin/pull/209)
   by [ajspadial])
* (I18n) az: Add Azerbaijani translation
  ([#218](https://github.com/cucumber/gherkin/pull/218)
   by [nalekberov])
* (Java) Add a getter for the tags of a pickle
   by [brasmusson])

### Changed
* Gherkin has moved from [cucumber/gherkin](https://github.com/cucumber/gherkin) to the [cucumber/cucumber](https://github.com/cucumber/cucumber) monorepo
* (.NET) Migrated code to .NET Core
  ([#215](https://github.com/cucumber/gherkin/pull/215)
   by [SabotageAndi])
* (I18n) Russian translation fix
  ([#255](https://github.com/cucumber/gherkin/pull/255)
   by [ehpc])

### Fixed
* (Javascript) Check for module before window
  ([#204](https://github.com/cucumber/gherkin/pull/204)
   by [charlierudolph])

## [4.0.0] - 2016-04-10

This is a major release because of two backwards-incompatible changes.

First, the AST returned by the parser is a `GherkinDocument` node, with a `feature`
property pointing to a `Feature` node. Prior to this release the parser would return
a `Feature` node.

Second, the `Feature` node now has an array/list of `children` that are `Background`,
`Scenario` or `ScenarioOutline`.

Other noteworthy changes is several minor improvements to bring the grammar closer
to Gherkin 2.

### Removed
* (JavaScript) Remove bower package
   by [aslakhellesoy])

### Added
* (JavaScript) Expose dialects
  ([#177](https://github.com/cucumber/gherkin/pull/177)
   by [charlierudolph])
* (Perl) new implementation!
  ([#161](https://github.com/cucumber/gherkin/pull/161)
   by [pjlsergeant])
* (Objective-C) Added Objective-C example to the README
  ([#152](https://github.com/cucumber/gherkin/pull/152)
   by [Ahmed-Ali])
* (I18n) ru: Add "Функциональность" as translation of Feature
  ([#165](https://github.com/cucumber/gherkin/pull/165)
   by [nixel2007])

### Changed
* (All) Allow emtpy Feature files
  ([#189](https://github.com/cucumber/gherkin/pull/189)
  by [aslakhellesoy], [brasmusson], [enkessler])
* (All) Rename Feature.scenarioDefinitions to Feature.children
  (by [aslakhellesoy])
* (All) Background as part of Feature.children
  ([#174](https://github.com/cucumber/gherkin/pull/174)
   by [aslakhellesoy])
* (All) Remove scenario keyword from pickles
  ([#176](https://github.com/cucumber/gherkin/pull/176)
   by [charlierudolph])
* (All) Don't make pickles out of step-less scenarios
  ([#175](https://github.com/cucumber/gherkin/pull/175)
   by [enkessler])
* (Ruby) More consistent AST node types
  ([#158](https://github.com/cucumber/gherkin/pull/158)
   by [enkessler])
* (All) Allow incomplete scenario outlines
  ([#160](https://github.com/cucumber/gherkin/pull/160),
   [#170](https://github.com/cucumber/gherkin/pull/170)
   by [brasmusson])

### Fixed
* (Ruby) Use require instead of require_relative
  ([#173](https://github.com/cucumber/gherkin/pull/173)
   by [maximeg])
* (JavaScript) Fixed undefined reference to stopOnFirstError on ES6
  (by [aslakhellesoy])
* (Python) Add the `gherkin.pickles` package to the Python installation
  ([#157](https://github.com/cucumber/gherkin/pull/157),
   [#156](https://github.com/cucumber/gherkin/issues/156)
   by [Zearin])
* (Ruby, Java) Make parser work even when system encoding ($LANG) is not UTF-8.
  ([#151](https://github.com/cucumber/gherkin/issues/151)
   by [aslakhellesoy])

## [3.2.0] - 2016-01-12

### Added
* (I18n) Mongolian translation of Gherkin
  ([#140](https://github.com/cucumber/gherkin/pull/140)
   by [jargalan])
* (I18n) Emoji translation of Gherkin
  (by [aslakhellesoy])
* (Python) Implemented compiler
  ([#124](https://github.com/cucumber/gherkin/pull/124)
   by [Zearin])
* (Objective C) New implementation
  ([#110](https://github.com/cucumber/gherkin/pull/110)
   by [LiohAu])

### Changed
* (All) changed package/module/repo name from `gherkin3` to `gherkin`. (Python package is called `gherkin-official`)
* (I18n) Improved Malay translation of Gherkin
  ([#132](https://github.com/cucumber/gherkin/pull/132)
   by [gabanz])
* (I18n) Improved Irish translation of Gherkin
  ([#135](https://github.com/cucumber/gherkin/pull/135)
   by [merrua])
* (All) Escape only '|', 'n' and '\' in table cells
  ([#114](https://github.com/cucumber/gherkin/pull/114)
   by [brasmusson])
* (I18n) Support stricter French grammar
  ([#134](https://github.com/cucumber/gherkin/pull/134)
   by [moreau-nicolas])
* (All) the AST's `DocString` `contentType` property is not defined rather than
  an empty string when the Gherkin doc doesn't specify the type after three backticks.
  (by [aslakhellesoy])

### Fixed
* (Python) Fix i18n support when parsing features from strings.
  (by [brasmusson])
* (All) Do not change escaped docstring separators in descriptions
  ([#115](https://github.com/cucumber/gherkin/pull/115)
   by [brasmusson])
* (Travis CI) Build Objective-C on Travis. Fix Travis language settings.
  ([#122](https://github.com/cucumber/gherkin/pull/122),
   [#118](https://github.com/cucumber/gherkin/issues/118),
   by [brasmusson])
* (Python) Don't monkey-patch `io.StringIO` in `token_scanner.py`
  ([#121](https://github.com/cucumber/gherkin/pull/121)
   by [zbmott])
* (JavaScript) Interpolate replaces globally
  ([#108](https://github.com/cucumber/gherkin/pull/108)
   by [charlierudolph])
* (JavaScript)  Make parser work on Node 0.10 and 4.1
  (by [aslakhellesoy])
* (Go) Fix lookahead bug in the parser
  (by [brasmusson])

## [3.1.2] - 2015-10-04

### Added
* (All) `TokenMatcher` now accepts a default language
  (previously, only JavaScript had this behavior)
  ([#78](https://github.com/cucumber/gherkin/issues/78)
   by [brasmusson])
* (Ruby) `Parser.parse` now accepts a `String`, `StringIO`, `IO` or `TokenScanner`
  ([#100](https://github.com/cucumber/gherkin/pull/100)
   by [maxmeyer])
* (JavaScript) Add browserified `dist/gherkin.js` and `dist/gherkin.min.js`
  (by [aslakhellesoy])

### Changed
* (Python) Use `@properties` in `Dialect` class
  ([#86](https://github.com/cucumber/gherkin/pull/86)
   by [Zearin])
* (Ruby) `Parser.parse` now treats `String` as source (not a file path)

### Fixed
* (Ruby) Fix lookahead bug in the parser
  ([#104](https://github.com/cucumber/gherkin/issues/104)
   by [brasmusson]
   and [aslakhellesoy])
* (Python) Fix file parsing on Windows
  ([#93](https://github.com/cucumber/gherkin/issues/93)
   by [brasmusson])

## [3.1.1] - 2015-09-03

### Added
* (All) Add Bosnian
  ([#48](https://github.com/cucumber/gherkin/pull/48)
   by [paigehf])
* (All) Add support for `\n`, '\|', and '\\' in table cells
  ([#40](https://github.com/cucumber/gherkin/issues/40),
   [#71](https://github.com/cucumber/gherkin/pull/71),
   by [koterpillar])
* (JavaScript)  Default arguments for `Parser(builder)` and `Parser.parse(scanner, matcher)`
  (by [aslakhellesoy])
* (JavaScript) It's now possible to pass a string directly to `Parser.parse()`
* (Python) It's now possible to pass a string directly to `Parser.parse()`
  (by [aslakhellesoy])

### Changed
* (Java) Improved build process
* (Python) Use new-style classes
  ([#72](https://github.com/cucumber/gherkin/pull/72)
   by [Zearin])

### Fixed
* (Python) File descriptors are now explicitly closed
  ([#74](https://github.com/cucumber/gherkin/pull/74)
   by [Zearin])

## [3.1.0] - 2015-08-16

### Removed
* (JavaScript) Remove `tea-error` dependency

### Added
* (.NET) Release Nuget package
  ([#57](https://github.com/cucumber/gherkin/issues/57),
   [#58](https://github.com/cucumber/gherkin/issues/58))

### Changed
* (Java) Change Maven `groupId` artifact from `info.cukes` to `io.cucumber`

### Fixed
* (All) Multiple calls to `parse()` cannot use the same instance of `AstBuilder`
  ([#62](https://github.com/cucumber/gherkin/issues/62))
* (Python) `gherkin-languages.json` not packaged
  ([#63](https://github.com/cucumber/gherkin/issues/63))


## 3.0.0 - 2015-07-16

* First release

<!-- Releases -->
[Unreleased]: https://github.com/cucumber/cucumber/compare/gherkin/v19.0.3...main
[19.0.3]:     https://github.com/cucumber/cucumber/compare/gherkin/v19.0.2...gherkin/v19.0.3
[19.0.2]:     https://github.com/cucumber/cucumber/compare/gherkin/v19.0.1...gherkin/v19.0.2
[19.0.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v19.0.0...gherkin/v19.0.1
[19.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v18.1.1...gherkin/v19.0.0
[18.1.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v18.1.0...gherkin/v18.1.1
[18.1.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v18.0.0...gherkin/v18.1.0
[18.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v17.0.2...gherkin/v18.0.0
[17.0.2]:     https://github.com/cucumber/cucumber/compare/gherkin/v17.0.1...gherkin/v17.0.2
[17.0.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v17.0.0...gherkin/v17.0.1
[17.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v16.0.0...gherkin/v17.0.0
[16.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v15.0.2...gherkin/v16.0.0
[15.0.2]:     https://github.com/cucumber/cucumber/compare/gherkin/v15.0.1...gherkin/v15.0.2
[15.0.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v15.0.0...gherkin/v15.0.1
[15.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v14.2.0...gherkin/v15.0.0
[14.2.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v14.1.0...gherkin/v14.2.0
[14.1.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v14.0.2...gherkin/v14.1.0
[14.0.2]:     https://github.com/cucumber/cucumber/compare/gherkin/v14.0.1...gherkin/v14.0.2
[14.0.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v12.2.1...gherkin/v14.0.1
[12.2.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v14.0.0...gherkin/v12.2.1
[14.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v13.0.0...gherkin/v14.0.0
[13.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v12.0.0...gherkin/v13.0.0
[12.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v11.0.0...gherkin/v12.0.0
[11.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v10.0.0...gherkin/v11.0.0
[10.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v9.2.0...gherkin/v10.0.0
[9.2.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v9.1.0...gherkin/v9.2.0
[9.1.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v9.0.0...gherkin/v9.1.0
[9.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v8.2.1...gherkin/v9.0.0
[8.2.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v8.2.0...gherkin/v8.2.1
[8.2.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v8.1.1...gherkin/v8.2.0
[8.1.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v8.1.0...gherkin/v8.1.1
[8.1.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v8.0.0...gherkin/v8.1.0
[8.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.4...gherkin/v8.0.0
[7.0.4]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.3...gherkin/v7.0.4
[7.0.3]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.2...gherkin/v7.0.3
[7.0.2]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.1...gherkin/v7.0.2
[7.0.1]:     https://github.com/cucumber/cucumber/compare/gherkin/v7.0.0...gherkin/v7.0.1
[7.0.0]:     https://github.com/cucumber/cucumber/compare/gherkin/v6.0.17...gherkin/v7.0.0
[6.0.17]:     https://github.com/cucumber/cucumber/compare/gherkin-v6.0.15...gherkin/v6.0.17
[6.0.15]:     https://github.com/cucumber/cucumber/compare/gherkin-v6.0.14...gherkin/v6.0.15
[6.0.14]:     https://github.com/cucumber/cucumber/compare/gherkin-v6.0.13...gherkin/v6.0.14
[6.0.13]:     https://github.com/cucumber/cucumber/compare/gherkin-v5.1.0...gherkin/v6.0.13
[5.1.0]:      https://github.com/cucumber/cucumber/compare/gherkin-v5.0.0...gherkin-v5.1.0
[5.0.0]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.3...gherkin-v5.0.0
[4.1.3]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.2...gherkin-v4.1.3
[4.1.2]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.1...gherkin-v4.1.2
[4.1.1]:      https://github.com/cucumber/cucumber/compare/gherkin-v4.1.0...gherkin-v4.1.1
[4.1.0]:      https://github.com/cucumber/cucumber/tree/gherkin-v4.1.0
[4.0.0]:      https://github.com/cucumber/gherkin/compare/v3.2.0...v4.0.0
[3.2.0]:      https://github.com/cucumber/gherkin/compare/v3.1.2...v3.2.0
[3.1.2]:      https://github.com/cucumber/gherkin/compare/v3.1.1...v3.1.2
[3.1.1]:      https://github.com/cucumber/gherkin/compare/v3.1.0...v3.1.1
[3.1.0]:      https://github.com/cucumber/gherkin/compare/v3.0.0...v3.1.0

<!-- Contributors -->
[Ahmed-Ali]:         https://github.com/Ahmed-Ali
[ankitpokhrel]:      https://github.com/ankitpokhrel
[ajspadial]:         https://github.com/ajspadial
[aslakhellesoy]:     https://github.com/aslakhellesoy
[badeball]:          https://github.com/badeball
[brasmusson]:        https://github.com/brasmusson
[charlierudolph]:    https://github.com/charlierudolph
[ciaranmcnulty]:     https://github.com/ciaranmcnulty
[coderbyheart]:      https://github.com/coderbyheart
[cyocum]:            https://github.com/cyocum
[danilat]:           https://github.com/danilat
[davidjgoss]:        https://github.com/davidjgoss
[deivid-rodriguez]:  https://github.com/deivid-rodriguez
[dobiedad]:          https://github.com/dobiedad
[ehpc]:              https://github.com/ehpc
[ehuelsmann]:        https://github.com/ehuelsmann
[enkessler]:         https://github.com/enkessler
[gabanz]:            https://github.com/gabanz
[gasparnagy]:        https://github.com/gasparnagy
[Haukinger]:         https://github.com/Haukinger
[hkosova]:           https://github.com/hkosova
[jargalan]:          https://github.com/jargalan
[jmezach]:           https://github.com/jmezach
[joscha]:            https://github.com/joscha
[johnknoop]:         https://github.com/johnknoop
[koterpillar]:       https://github.com/koterpillar
[KniveX]:            https://github.com/KniveX
[l3pp4rd]:           https://github.com/l3pp4rd
[LiohAu]:            https://github.com/LiohAu
[luke-hill]:         https://github.com/luke-hill
[mattwynne]:         https://github.com/mattwynne
[mauriciotogneri]:   https://github.com/mauriciotogneri
[maximeg]:           https://github.com/maximeg
[maxmeyer]:          https://github.com/maxmeyer
[mgiustiniani]:      https://github.com/mgiustiniani
[mpkorstanje]:       https://github.com/mpkorstanje
[merrua]:            https://github.com/merrua
[milhcbt]:           https://github.com/milhcbt
[moreau-nicolas]:    https://github.com/moreau-nicolas
[mpkorstanje]:       https://github.com/mpkorstanje
[nvmkpk]:            https://github.com/nvmkpk
[nalekberov]:        https://github.com/nalekberov
[nixel2007]:         https://github.com/nixel2007
[nikolovski]:        https://github.com/nikolovski
[noisygerman]:       https://github.com/noisygerman
[ookull]:            https://github.com/ookull
[OrhanTozan]:        https://github.com/OrhanTozan
[paigehf]:           https://github.com/paigehf
[pjlsergeant]:       https://github.com/pjlsergeant
[plavcik]:           https://github.com/plavcik
[pmatsinopoulos]:    https://github.com/pmatsinopoulos
[rjwittams]:         https://github.com/rjwittams
[Pr-Mex]:            https://github.com/Pr-Mex
[Pwera]:             https://github.com/Pwera
[SabotageAndi]:      https://github.com/SabotageAndi
[sergioforerogomez]: https://github.com/sergioforerogomez
[tsundberg]:         https://github.com/tsundberg
[upgundecha]:        https://github.com/upgundecha
[vincent-psarga]:    https://github.com/vincent-psarga
[zbmott]:            https://github.com/zbmott
[Zearin]:            https://github.com/Zearin
[WannesFransen1994]: https://github.com/WannesFransen1994
