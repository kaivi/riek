2.0.1 / 2018-04-06
=================
- `package.json` update

2.0.0 / 2018-04-06
=================
- Minor bug fixes [#71](https://github.com/kaivi/riek/pull/71) (addresses [#33](https://github.com/kaivi/riek/issues/33) & [#67](https://github.com/kaivi/riek/issues/67)) and [#59](https://github.com/kaivi/riek/pull/59/)
- Add: wrap-element support [#72](https://github.com/kaivi/riek/pull/72)
- Fix: Add validate to tags control [#45](https://github.com/kaivi/riek/pull/45)
- Fix: RIEInput is deselected when rerender occur [#46](https://github.com/kaivi/riek/issues/46)
- Add: Implement set `editing` state programmatically [#50](https://github.com/kaivi/riek/pull/50)
- Add: `selectAll` boolean flag to alter focus and select behavior [#57](https://github.com/kaivi/riek/pull/57/)
- Change: display whitespaces accordingly in normal(non-editing) mode [#60](https://github.com/kaivi/riek/pull/60)
- Add: Dynamically grow/shrink dimensions of RIEInput during editing [#65](https://github.com/kaivi/riek/pull/65)
- Change: Support react 16 [#69](https://github.com/kaivi/riek/pull/69)
- Add: `shouldStartEditOnDoubleClick` option to edit on double click [#70](https://github.com/kaivi/riek/pull/70)
- Fix: TextArea default value bug [#b301a84](https://github.com/attently/riek/commit/b301a84ab045eccfb55a11cb6228e7fbb2f8febc)
- Fix: Tags default value bug [#2a58731](https://github.com/attently/riek/commit/2a5873197b9427c50a9312d01cf2e9a838015d71)
- Fix: Minor Style settings [#69f691f](https://github.com/attently/riek/commit/69f691fa23e9cccfb68a3140f81f9348498da3c4) & [#2395f4d](https://github.com/attently/riek/commit/2395f4da61029370f197b59ee6bb7f6f11e03a9e)
- Change: `getValue()` returns `defaultValue` only if the `oldValue` is false-ish [#66a1e27](https://github.com/attently/riek/commit/66a1e27d7077c177431b1555f6e0396aecc92948)
- Change: Using default in case the text is missing [#67add1d](https://github.com/attently/riek/commit/67add1dd439a3581c5f229a314c3e318a0362ba1)
- Change: Tag now prevents duplicates [#335d7a0](https://github.com/attently/riek/commit/335d7a04082a3769ec23ca569462bc9f11dcb455)

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
