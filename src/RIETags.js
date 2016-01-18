import React from 'react';
import ReactDOM from 'react-dom';
import RIEStatefulBase from './RIEStatefulBase';

class RIETag extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: React.PropTypes.string.isRequired,
        removeHandler: React.PropTypes.func,
        className: React.PropTypes.string
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
        value: React.PropTypes.object.isRequired,
        maxTags: React.PropTypes.number,
        minTags: React.PropTypes.number,
        separator: React.PropTypes.string,
        elementClass: React.PropTypes.string,
        blurDelay: React.PropTypes.number,
        placeholder: React.PropTypes.string
    };

    addTag = (tag) => {
        if([...this.props.value].length < (this.props.maxTags || 65535)) {
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
            onFocus={this.startEditing}>{tags}</span>;
    };

    makeTagElement = (text) => {
        return <RIETag key={text} text={text} removeHandler={this.removeTag} />;
    };

    renderEditingComponent = () => {
        let elements = [...this.props.value].map(this.makeTagElement);
        return <div tabIndex="1" onClick={this.startEditing} className={this.makeClassString()}>
            {elements}
            <input
                onBlur={this.cancelEditingDelayed}
                onKeyDown={this.keyDown}
                placeholder={(this.props.placeholder || "New tag")}
                ref="input" />
        </div>;
    };
}
