#React Inline Edit Kit
An assortment of common HTML form elements, editable in-line the React way.

Try out [the demo](http://kaivi.github.io/riek/) and see what it looks like.

#Installation
`npm install riek --save-dev`

#Usage
```javascript
import { RIEToggle, RIEInput, RIENumber, RIETags } from 'riek'
```
See /demo/src/demo.js for examples.

##Common props

###Required
* **value**: initial prop value
* **propName**: name of the prop to return to the _change_ function
* **change**: function which will receive a plain object with a single key, provided in _propName_

###Optional
* **doValidations**: validator function, returning a boolean
* **shouldBlockWhileLoading**: disables editing until a new value is confirmed by parent
* **classLoading**: CSS class name to use when loading
* **classEditing**: CSS class name to apply while in editing mode
* **classInvalid**: CSS class name to apply when _doValidatoon_ returned false
* **className**: CSS base class

###Component-specific props

####RIENumber
* **format**: custom formatting function, returns formatted string
