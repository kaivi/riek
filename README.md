# React Inline Edit Kit
An assortment of common HTML form elements, editable in-line the React way.

Try out [the demo](http://kaivi.github.io/riek/) and see what it looks like.

# Installation
`npm install riek --save-dev`

*or*

`yarn add riek --dev`

*Use `--save-dev` because you don't want to build and pack JS/CSS in production*

# Usage
Import the library:

```javascript
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'
```

Suppose we want to be able to edit title of a `Task` and send changes to server. Here is a `Task` stored flat inside of our parent React component:

```javascript
this.state = {
  id: 1,
  title: 'Cover with tests',
  completed: false
}
```

Now we need a function which will send the single altered `{ key: value }` and upsert local state. You can implement it inside of your flux/redux/mobx store:

```javascript
const httpTaskCallback = (task) => {
  request.post(`/api/task/${this.state.id}`)
    .send(task)
    .end((err, res) => {
      if (!err) return this.setState({ ...task })
      // Handle HTTP error
    })
}
```

Meanwhile, there is a simple Express handler on our API server:

```javascript
app.use('/api/task/:id', async (req, res) => {
  // req.body will equal to { title: 'A new title' }
  const { id } = req.params
  await Task.update({ ...req.body }).where({ id })
  res.send('OK')
})
```

Finally, in our `render` method, we add a minimal `RIEInput`:

```javascript
<RIEInput
  value={this.state.text}
  change={this.httpTaskCallback}
  propName='title'
  validate={_.isString} />
```

...repeat the last step, adding a Riek component for any object property we wish to edit.

Components come unstyled, so take a look at [demo.jsx](https://github.com/kaivi/riek/blob/master/demo/demo.jsx) for examples.

## Common props

### Required
* **value**: initial prop value
* **propName**: name of the prop to return to the _change_ function
* **change**: function which will receive a plain object with a single key, provided in _propName_

### Optional
* **validate**: validator function, returning a boolean
* **shouldBlockWhileLoading**: disables editing until a new value is confirmed by parent
* **shouldRemainWhileInvalid**: remain in editing mode if validation fails
* **classLoading**: CSS class name to use when loading
* **classEditing**: CSS class name to apply while in editing mode
* **classInvalid**: CSS class name to apply when _doValidatoon_ returned false
* **className**: CSS base class
* **editProps**: Additional props for the editing component. This allows you to, for example, specify a maxLength attribute to control the maximum number of characters in the textarea, or add `style`.
* **defaultProps**: Additional props for idle component.
### Optional hooks
* **beforeStart**: Fires before editing starts
* **afterStart**: Fires after editing starts
* **beforeFinish**: Fires before editing ends, before validations
* **afterFinish**: Fires after editing ends, after validations

### Component-specific props

#### RIENumber
* **format**: custom formatting function, returns formatted string

#### RIETextArea
* **rows**: rows property on textarea tag while editing
* **cols**: rows property on textarea tag while editing

#### RIESelect
* **options**: an array of objects containing values and text for [select options](http://www.w3schools.com/tags/tag_option.asp)
```javascript
<RIESelect ... options={[
  {id: '1', text: 'one'},
  {id: '2', text: 'two'},
  {id: '3', text: 'three'}
]} />
```

# Contributing

The build process does not work with Node v6 at the moment: use [Node Version Manager](https://github.com/creationix/nvm), or just plain Node v5.6.0.

1. Clone this repo locally, run `npm i`
2. Make your changes
3. Do `npm run build` to compile the lib and demo
4. Open `index.html` and check if it works
5. Open JS console in browser, set `localStorage.debug = '*'` to see debug messages, add more if necessary
6. ???
7. Submit a pull request