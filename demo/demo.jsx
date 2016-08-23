import React from 'react';
import ReactDOM from 'react-dom';
import Highlight from 'react-highlight';
import {RIEInput, RIEToggle, RIETextArea, RIENumber, RIETags} from '../src/index.js';

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    boolean : true,
    number : 9000,
    text : "Example text value",
    textareaText : `Multiline example
text value`,
    date : Date.now(),
    tags: new Set(["Bergen", "Asmara", "Göteborg", "Newcastle", "Seattle"]),
    simulateXHR: false,
    XHRDelay: 450,
    highlight: false,
    showSource: false
    };
  }

  virtualServerCallback = (newState) => {
    if (this.state.simulateXHR) {
    window.setTimeout(function() {
      this.changeState(newState);
    }.bind(this), this.state.XHRDelay);
    } else {
    this.changeState(newState);
    }
  };

  changeState = (newState) => {
    this.setState(newState);
  };

  isStringAcceptable = (string) => {
    return (string.length >= 1);  // Minimum 4 letters long
  };

  isStringEvenNumber = (string) => {
    console.log('is even: ' + string);
    var number = parseInt(string);
    if (isNaN(number) || !isFinite(number)) return false;
    return number % 2 == 0;
  };

  isValidXHRDelay = (text) => {
    let number = parseInt(text);
    if (isNaN(number)) return false;
    return (0 < number) && (number < 50000);
  };

  formatInteger = (number) => {
    return number.toString() + " feet";
  };

  formatMillisecondsAppend = (text) => {
    return text + " ms";
  };

  render = () => {
    let xhrDelaySwitch = (this.state.simulateXHR) ? <li>XHR delay: <RIENumber value={this.state.XHRDelay} change={this.changeState} validate={this.isValidXHRDelay} propName="XHRDelay" className="editable-pill" format={this.formatMillisecondsAppend} /></li> : null;
    return <div>
    <div className="menu">
      <div className="fifty">
        <h3>Application State</h3>
        <ul>
          <li><i>boolean:</i> {this.state.boolean.toString()}</li>
          <li><i>text:</i> {this.state.text}</li>
          <li><i>textareaText:</i> {this.state.textareaText.replace(new RegExp("\n", "g"), "\\n")}</li>
          <li><i>number:</i> {this.state.number}</li>
        <li><i>tags:</i> {[...this.state.tags].join(', ')}</li>
        </ul>
      </div>
      <div className="fifty">
        <h3>Options</h3>
        <ul>
        <li>Simulate XHR: <RIEToggle value={this.state.simulateXHR} change={this.changeState} propName="simulateXHR" textTrue="yes" textFalse="don't" className="editable-pill"/></li>
        {xhrDelaySwitch}
        <li>Highlight editable: <RIEToggle value={this.state.highlight} change={this.changeState} propName="highlight" textTrue="highlight" textFalse="don't" className="editable-pill" /></li>
        <li><RIEToggle value={this.state.showSource} change={this.changeState} propName="showSource" textTrue="Source shown" textFalse="Source hidden" className="editable-pill"/></li>
        </ul>
      </div>
    </div>
    <div className="content">
      <h3>Toggle</h3>
      <div>
        <span>Default: </span>
        <RIEToggle
          value={this.state.boolean}
          className={this.state.highlight ? "editable" : ""}
          change={this.virtualServerCallback}
          classLoading="loading"
          propName="boolean" />
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIEToggle
  value={this.state.boolean}
  className={this.state.highlight ? "editable" : ""}
  change={this.virtualServerCallback}
  classLoading="loading"
  propName="boolean" />`}
        </Highlight> : null}
        <br />
        <span>Custom labels: </span>
        <RIEToggle
          value={this.state.boolean}
          className={this.state.highlight ? "editable" : ""}
          change={this.virtualServerCallback}
          textTrue="activated"
          textFalse="deactivated"
          classLoading="loading"
          propName="boolean" />
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIEToggle
  value={this.state.boolean}
  className={this.state.highlight ? "editable" : ""}
  change={this.virtualServerCallback}
  textTrue="activated"
  textFalse="deactivated"
  classLoading="loading"
  propName="boolean" />`}
        </Highlight> : null}
      </div>
      <hr />
      <h3>Input</h3>
      <div>
        <span>Default: </span>
        <RIEInput
          value={this.state.text}
          change={this.virtualServerCallback}
          propName="text"
          className={this.state.highlight ? "editable" : ""}
          validate={this.isStringAcceptable}
          classLoading="loading"
          classInvalid="invalid" />
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIEInput
  value={this.state.text}
  change={this.virtualServerCallback}
  propName="text"
  className={this.state.highlight ? "editable" : ""}
  validate={this.isStringAcceptable}
  classLoading="loading"
  classInvalid="invalid"/>`}
        </Highlight> : null}
      </div>
      <hr />
      <h3>Textarea</h3>
      <div>
        <p>Default: </p>
        <RIETextArea
          value={this.state.textareaText}
          change={this.virtualServerCallback}
          propName="textareaText"
          className={this.state.highlight ? "editable" : ""}
          validate={this.isStringAcceptable}
          classLoading="loading"
          classInvalid="invalid" />
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIETextArea
  value={this.state.textareaText}
  change={this.virtualServerCallback}
  propName="textareaText"
  className={this.state.highlight ? "editable" : ""}
  validate={this.isStringAcceptable}
  classLoading="loading"
  classInvalid="invalid"/>`}
        </Highlight> : null}
      </div>
      <hr />
      <h3>Number</h3>
      <div>
        <span>Default: </span>
        <RIENumber
          value={this.state.number}
          change={this.virtualServerCallback}
          propName="number"
          className={this.state.highlight ? "editable" : ""}
          classLoading="loading"
          classInvalid="invalid"/>
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIENumber
  value={this.state.number}
  change={this.virtualServerCallback}
  propName="number"
  className={this.state.highlight ? "editable" : ""}
  classLoading="loading"
  classInvalid="invalid"/>`}
        </Highlight> : null}
        <br />
        <span>Only even, custom formatter: </span>
        <RIENumber
          value={this.state.number}
          change={this.virtualServerCallback}
          propName="number"
          format={this.formatInteger}
          classLoading="loading"
          className={this.state.highlight ? "editable" : ""}
          validate={this.isStringEvenNumber}
          classInvalid="invalid"/>
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIENumber
  value={this.state.number}
  change={this.virtualServerCallback}
  propName="number"
  format={this.formatInteger}
  classLoading="loading"
  className={this.state.highlight ? "editable" : ""}
  validate={this.isStringEvenNumber}
  classInvalid="invalid"/>`}
        </Highlight> : null}
      </div>
      <hr />
      <h3>Tags</h3>
      <div>
        <span>Default: </span>
        <RIETags
          value={this.state.tags}
          change={this.virtualServerCallback}
          maxTags={10}
          minTags={2}
          propName="tags"
          placeholder="New"
          className={this.state.highlight ? "tags editable" : "tags"}
          classLoading="loading" />
        {this.state.showSource ? <Highlight className="jsx">
        {`<RIETags
  value={this.state.tags}
  change={this.virtualServerCallback}
  maxTags={10}
  minTags={2}
  propName="tags"
  placeholder="New"
  className={this.state.highlight ? "tags editable" : "tags"}
  classLoading="loading" />`}
        </Highlight> : null}
      </div>
    </div>
    </div>;
  };
}

ReactDOM.render(<Demo />, document.getElementById('app'));
