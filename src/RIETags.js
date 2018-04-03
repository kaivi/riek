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
        return  <div
			className={this.props.className}
			style={{cursor: 'default'}}
        >
            {this.props.text}
            <div
                onClick={this.remove}
				className={this.props.className ? `${this.props.className}-remove` : ''}
				style={{margin: '3px', cursor: 'pointer'}}
            > × </div>
        </div>;
    };
}

export default class RIETags extends RIEStatefulBase {
    constructor(props) {
        super(props);
        this.state.currentText = "";
        this.state.blurTimer = null;
    }

    static propTypes = {
        value: PropTypes.object.isRequired,
        maxTags: PropTypes.number,
        minTags: PropTypes.number,
        separator: PropTypes.string,
        elementClass: PropTypes.string,
        blurDelay: PropTypes.number,
        placeholder: PropTypes.string,
        wrapper: PropTypes.string,
        wrapperClass: PropTypes.string,
        wrapperEditing: PropTypes.string,
	};

	static defaultProps = {
		...RIEStatefulBase.defaultProps,
		defaultValue: new Set(['default']),
		minTags: 1,
	};

    addTag = (tag) => {
        if(this.doValidations(tag) && [...this.props.value].length < (this.props.maxTags || 65535)) {
            this.commit(this.props.value.add(tag));
        }
    };

    removeTag = (tag) => {
		clearTimeout(this.state.blurTimer);

		let set = this.props.value;
		set.delete(tag);

		if(set.size < this.props.minTags - 1) {
			if(typeof this.defaultValue === 'function')
				this.commit(this.defaultValue(set));
			else if(this.props.defaultValue instanceof Set) {
				let setIndex = (set.size - 1 >= 0 ? set.size - 1 : 0);

				while(set.size < this.props.minTags - 1) {
					if(setIndex >= this.props.defaultValue.size)
						setIndex = 0;

					set.add([...this.props.defaultValue][setIndex]);
					setIndex++;
				}

				this.commit(set);
			}
			else {
				set.add(this.props.defaultValue);
				this.commit(set);
			}
		}
		else
			this.commit(set);
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
		const editingHandlers = !this.props.shouldStartEditOnDoubleClick ? {
            onFocus: this.startEditing,
        } : {
            onDoubleClick: this.startEditing,
		};

        if(this.props.wrapper) {
            let tags = [...this.props.value].map((value, index) => {
                const wrapper = React.createElement(this.props.wrapper, {
                    key: index,
                    children: [value],
                    className: this.props.wrapperClass,
                });

                return wrapper;
			});

            return <span
                tabIndex="0"
                className={this.makeClassString()}
                {...editingHandlers}
                {...this.props.defaultProps}
            >{
                tags.reduce((result, el, index, arr) => {
                    result.push(el);

                    if(index < arr.length - 1)
                        result.push(this.props.separator || ', ');

                    return result;
                }, [])
            }</span>;
        }
        else {
            let tags = [...this.props.value].join(this.props.separator || ', ');

            return <span
                tabIndex="0"
                className={this.makeClassString()}
                {...editingHandlers}
                {...this.props.defaultProps}>
                {tags}
            </span>;
        }
    };

    makeTagElement = (text, index) => {
        return <RIETag className={this.props.wrapperEditing} key={index} text={text} removeHandler={this.removeTag} />;
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
