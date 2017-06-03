1.1.0 / 2017-06-03
=================
- Fixed issue [#41](https://github.com/kaivi/riek/issues/41)
  * Always validate to true if no validator passed

1.0.9 / 2017-06-01
=================

- Fixed issue [#28](https://github.com/kaivi/riek/issues/28) with RIENumber not working on Firefox

1.0.8 / 2017-06-01
==================

- Bumped React dependency up to v15.5.4
- Now using `prop-types` library as a dependency
- Rework PR [#27](https://github.com/kaivi/riek/pull/27), add hooks `beforeStart, afterStart, beforeFinish, onFinish`
- Use React v15.5.0 in demo
- Use Highlight.js v9.4.0 in demo

* Merged PR [18](https://github.com/kaivi/riek/pull/16) manually
  - Not sure what that means, rephrased 1 assertion on [line 9](https://github.com/kaivi/riek/blob/master/src/RIEBase.js#L10) in RIEBase.js
* Merged PR [24](https://github.com/kaivi/riek/pull/24)
  - Fix [Issue #23](https://github.com/kaivi/riek/issues/23) [isDisabled]: enables the isDisabled prop
* Merged PR [#27](https://github.com/kaivi/riek/pull/27)
  - Added onFinish and onStart hooks
* Merged PR [#32](https://github.com/kaivi/riek/pull/32)
  - Remove console.log from demo.js
* Merged PR [#35](https://github.com/kaivi/riek/pull/35)
  - Fix titles in readme
* Merged PR [#36](https://github.com/kaivi/riek/pull/36)
  - Use separate `prop-types` library
* Merged part of [springuper/riek](https://github.com/springuper/riek/commit/741c75d808f25d3ef5ecf1483162e24abb6bd677)
  - Add `shouldRemainWhileInvalid` prop

1.0.6 / 2016-11-01
==================

* Merged PR [16](https://github.com/kaivi/riek/pull/16)
  - Added editProps property to define additional props in edit mode

1.0.5 / 2016-09-26
==================

* Medged PR [10](https://github.com/kaivi/riek/pull/10)
  - Add RIESelect component

1.0.4 / 2016-09-11
==================

* Merged PR [#11](https://github.com/kaivi/riek/pull/9)
  - Fixed text selection code in the case of `number` type
* Merged PR [#12](https://github.com/kaivi/riek/pull/12)
  - remove duplicate export

1.0.3 / 2016-08-23
==================

* Merged PR [#9](https://github.com/kaivi/riek/pull/9)
  - add `RIETextArea`
* Merged PR [#8](https://github.com/kaivi/riek/pull/8)
  - Make input `type = "number"` for `RIENumber`

1.0.2 / 2016-05-19
==================

* Merged PR [#5](https://github.com/kaivi/riek/pull/5)
  - Removed `console.log` calls

1.0.1 / 2016-05-19
==================

* Merged PR [#7](https://github.com/kaivi/riek/pull/7)
  - Added compatibility with react 15.0

1.0.0
==================

* Initial release
