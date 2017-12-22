import React from 'react';
import ReactDOM from 'react-dom';
import RIEStatefulBase from './RIEStatefulBase';
import RIEBase from "./RIEBase";

class RIETag extends React.Component
{
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        removeHandler: React.PropTypes.func,
        className: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div key={this.props.text}>
                {this.props.text}
                <div
                    onClick={this.remove}
                    className={this.props.className || "remove"}
                > ×
                </div>
            </div>
        );
    };

    remove = () => {
        this.props.removeHandler(this.props.text);
    };
}

export default class RIETags extends RIEStatefulBase
{
    static propTyes = {
        value: React.PropTypes.object.isRequired,
        maxTags: React.PropTypes.number,
        minTags: React.PropTypes.number,
        separator: React.PropTypes.string,
        elementClass: React.PropTypes.string,
        blurDelay: React.PropTypes.number,
        placeholder: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state.currentText = "";
        this.state.blurTimer = null;
    }

    componentWillReceiveProps = (nextProps) => {
        if ('value' in nextProps) {
            this.setState({
                loading: false,
                invalid: false
            });
        }
    };

    componentDidUpdate = () => {
        const inputElem = ReactDOM.findDOMNode(this.refs.input);
        if (this.state.editing) {
            inputElem.focus();
        }
    };

    renderNormalComponent = () => {
        const tags = [...this.props.value].join(this.props.separator || ", ");
        return (
            <span
                tabIndex="0"
                className={this.makeClassString()}
                onFocus={this.startEditing}
                {...this.props.defaultProps}
            >
                {tags}
            </span>
        );
    };

    renderEditingComponent = () => {
        const elements = [...this.props.value].map(this.renderTagElement);
        return (
            <div
                tabIndex="1"
                onClick={this.startEditing}
                className={this.makeClassString()}
                {...this.props.editProps}
            >
                {elements}
                <input
                    onBlur={this.cancelEditingDelayed}
                    onKeyDown={this.keyDown}
                    placeholder={(this.props.placeholder || "New tag")}
                    ref="input"
                />
            </div>
        );
    };

    renderTagElement = (text) => {
        return (
            <RIETag
                key={text}
                text={text}
                removeHandler={this.removeTag}
            />
        );
    };

    addTag = (tag) => {
        if([...this.props.value].length < (this.props.maxTags || 65535)) {
            this.commit(this.props.value.add(tag));
        }
    };

    removeTag = (tag) => {
        clearTimeout(this.state.blurTimer);

        if ([...this.props.value].length >= (this.props.minTags || 1)) {
            const newSet = this.props.value;
            newSet.delete(tag);
            this.commit(newSet);
        }
    };

    keyDown = (event) => {
        switch (event.keyCode) {
            case RIEBase.KEY_BACKSPACE:
                if(event.target.value.length === 0){
                    const tagToRemove = [...this.props.value].pop();
                    this.removeTag(tagToRemove);
                }
                break;
            case RIEBase.KEY_ENTER:
                event.preventDefault();
                if(event.target.value.length === 0) {
                    this.cancelEditing();
                    return;
                }

                this.addTag(event.target.value);
                event.target.value = "";
                break;
            case RIEBase.KEY_ESCAPE:
                this.cancelEditing();
                break;
        }
    };

    cancelEditingDelayed = () => {
        this.setState({
            blurTimer: setTimeout(
                this.cancelEditing,
                (this.props.blurDelay || 180)
            )
        })
    };

    cancelEditing = () => {
        this.setState({
            editing: false,
            invalid: false
        });
    };
}
