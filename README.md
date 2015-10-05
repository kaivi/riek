#React Inline Edit Kit
This kit aims to provide an assortment of components for most common HTML elements, editable in-line the React way.

Here be animations.

#Usage
`npm install riek --save-dev`
`import {RIEText, RIEToggle, RIETags} from 'riek'`

See the /demo/src for examples.

#Common protocol
###Common props
`value`:`text|number|bool|object`:**required** initial prop value

`change`:`function`:**required** which will receive an object with changed prop

`propName`:`text`:**required** prop name to be returned inside `change()` like `{propName: 'new value'}`

`doValidations`:`function`:*default `undefined`* custom boolean data validation function

`shouldBlockWhileLoading`:`bool`:*default `true`* if `true`, disables editing until a new value is confirmed by parent

`classLoading`:`string`:*default ``* Apply CSS class while changes are not yet updated

`classEditing`:`string`:*default ``* Apply CSS class while in editing mode

`classInvalid`:`string`:*default ``* Apply CSS class on failed validation

`className`:`string`:*default ``* Default CSS class

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

#Practical application
One would usually want to use these components in order to instantly update parts of a server object. For that to work, you should merge the newly changed prop with your object's unique ID somewhere before sending data to server, and implement an API which validates and persists your changes.

#Components specification
##RIEInput
##RIETextarea
##RIEToggle
`textTrue`:`string`:*default `yes`*
`textFalse`:`string`:*default `no`*
##RIETags
##RIETagsToggle
##RIENumber
##RIEDate
##RIEDateTime
