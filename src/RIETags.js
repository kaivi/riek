import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RIEStatefulBase from './RIEStatefulBase';

class RIETag extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        removeHandler: PropTypes.func,
        className: PropTypes.string
    };

    remove = () => {
        this.props.removeHandler(this.props.text);
    };

    render = () => {
        return  <div key={this.props.text}>{this.props.text}<div onClick={this.remove} className={this.props.className || "remove"}> × </div></div>;
    };
}

export default class RIETags extends RIEStatefulBase {

    constructor(props) {
        super(props);
        this.state.currentText = "";
        this.state.blurTimer = null;
    }

    static propTyes = {
        value: PropTypes.object.isRequired,
        maxTags: PropTypes.number,
        minTags: PropTypes.number,
        separator: PropTypes.string,
        elementClass: PropTypes.string,
        blurDelay: PropTypes.number,
        placeholder: PropTypes.string
    };

    addTag = (tag) => {
        if(this.doValidations(tag) && [...this.props.value].length < (this.props.maxTags || 65535)) {
            this.commit(this.props.value.add(tag));
        }
    };

    removeTag = (tag) => {

        clearTimeout(this.state.blurTimer);

        if ([...this.props.value].length >= (this.props.minTags || 1)) {
            let newSet = this.props.value;
            newSet.delete(tag);
            this.commit(newSet);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if ('value' in nextProps) this.setState({loading: false, invalid: false});
    };

    keyDown = (event) => {
        if (event.keyCode === 8) { // Backspace
            if(event.target.value.length == 0){
                let tagToRemove = [...this.props.value].pop();
                this.removeTag(tagToRemove);
            }

        } else if (event.keyCode === 13) { // Enter
            event.preventDefault();
            if(event.target.value.length === 0) {
                this.cancelEditing();
            } else {
                this.addTag(event.target.value);
                event.target.value = "";
            }
        } else if (event.keyCode === 27) { // Escape
            this.cancelEditing();
        }
    };

    cancelEditingDelayed = () => {
        this.setState({blurTimer: setTimeout(this.cancelEditing, (this.props.blurDelay || 180))})
    };

    cancelEditing = () => {
        this.setState({editing: false, invalid: false});
    };

    componentDidUpdate = (prevProps, prevState) => {
        var inputElem = ReactDOM.findDOMNode(this.refs.input);
        if (this.state.editing) {
            inputElem.focus();
        }
    };

    renderNormalComponent = () => {
        let tags = [...this.props.value].join(this.props.separator || ", ");
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            {...this.props.defaultProps}>{tags}</span>;
    };

    makeTagElement = (text) => {
        return <RIETag key={text} text={text} removeHandler={this.removeTag} />;
    };

    renderEditingComponent = () => {
        let elements = [...this.props.value].map(this.makeTagElement);
        return <div tabIndex="1" onClick={this.startEditing} className={this.makeClassString()} {...this.props.editProps}>
            {elements}
            <input
                onBlur={this.cancelEditingDelayed}
                onKeyDown={this.keyDown}
                placeholder={(this.props.placeholder || "New tag")}
                ref="input" />
        </div>;
    };
}
