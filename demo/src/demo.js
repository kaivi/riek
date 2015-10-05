'use strict';
/*global document, window */

import React from 'react';
import {RIEInput, RIEToggle, RIENumber, RIETags} from '../../src/index.js';

window.React = React;

class Demo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            boolean : true,
            number : 9000,
            text : "Example text value",
            date : Date.now(),
            tags: new Set(["Bergen", "Asmara", "Göteborg", "Newcastle", "Seattle"]),
            simulateXHR: false,
            XHRDelay: 450,
            highlight: false
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
        return (string.length >= 1);    // Minimum 4 letters long
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
                        <li>boolean: {this.state.boolean.toString()}</li>
                        <li>text: {this.state.text}</li>
                        <li>number: {this.state.number}</li>
                        <li>tags: {[...this.state.tags].join(', ')}</li>
                    </ul>
                </div>
                <div className="fifty">
                    <h3>Options</h3>
                    <ul>
                        <li>Simulate XHR: <RIEToggle value={this.state.simulateXHR} change={this.changeState} propName="simulateXHR" textTrue="yes" textFalse="don't" className="editable-pill"/></li>
                        {xhrDelaySwitch}
                        <li>Highlight editable: <RIEToggle value={this.state.highlight} change={this.changeState} propName="highlight" textTrue="highlight" textFalse="don't" className="editable-pill" /></li>
                    </ul>
                </div>
            </div>
            <div className="content">
                <h3>Toggle</h3>
                <p>
                    <span>Default: </span>
                    <RIEToggle
                        value={this.state.boolean}
                        className={this.state.highlight ? "editable" : ""}
                        change={this.virtualServerCallback}
                        classLoading="loading"
                        propName="boolean"/>
                    <br />
                    <span>Custom labels: </span>
                    <RIEToggle
                        value={this.state.boolean}
                        className={this.state.highlight ? "editable" : ""}
                        change={this.virtualServerCallback}
                        textTrue="activated"
                        textFalse="deactivated"
                        classLoading="loading"
                        propName="boolean"/>
                </p>
                <h3>Input</h3>
                <p>
                    <span>Default: </span>
                    <RIEInput
                        value={this.state.text}
                        change={this.virtualServerCallback}
                        propName="text"
                        className={this.state.highlight ? "editable" : ""}
                        validate={this.isStringAcceptable}
                        classLoading="loading"
                        classInvalid="invalid"/>
                </p>
                <h3>Number</h3>
                <p>
                    <span>Default: </span>
                    <RIENumber
                        value={this.state.number}
                        change={this.virtualServerCallback}
                        propName="number"
                        className={this.state.highlight ? "editable" : ""}
                        classLoading="loading"
                        classInvalid="invalid"/>
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
                </p>
                <h3>Tags</h3>
                <p>
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
                </p>
            </div>
        </div>;
    }
}

React.render(<Demo />, document.body);
