#React Inline Edit Kit
This project aims to provide an assortment of common HTML form elements, editable in-line the React way.

#How it works
See `./demo/src/demo.js` for introduction. Do `npm run build-demo` to save changes.

#Here be animations.

#Usage
`npm install riek --save-dev`
`import {RIEText, RIEToggle, RIETags} from 'riek'`

Check out the the demo for examples.

##Common props
`value`:`text|number|bool|object`:**required** initial prop value

`change`:`function`:**required** which will receive an object with changed prop

`propName`:`text`:**required** prop name to be returned inside `change()` like `{propName: 'new value'}`

`doValidations`:`function`:*default `undefined`* custom boolean data validation function

`shouldBlockWhileLoading`:`bool`:*default `true`* if `true`, disables editing until a new value is confirmed by parent

`classLoading`:`string`:*default ``* Apply CSS class while changes are not yet updated

`classEditing`:`string`:*default ``* Apply CSS class while in editing mode

`classInvalid`:`string`:*default ``* Apply CSS class on failed validation

`className`:`string`:*default ``* Default CSS class

# TODO: Finish the rest

###Component specific props
####RIEInput
####RIETextarea
####RIEToggle
####RIETags
####RIETagsToggle
####RIENumber
`format`:`function` custom formatting function, returns formatted string
####RIEDate
####RIEDateTime
