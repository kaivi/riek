'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIETag = function (_React$Component) {
    _inherits(RIETag, _React$Component);

    function RIETag(props) {
        _classCallCheck(this, RIETag);

        var _this = _possibleConstructorReturn(this, (RIETag.__proto__ || Object.getPrototypeOf(RIETag)).call(this, props));

        _this.remove = function () {
            _this.props.removeHandler(_this.props.text);
        };

        _this.render = function () {
            return _react2.default.createElement(
                'div',
                { key: _this.props.text },
                _this.props.text,
                _react2.default.createElement(
                    'div',
                    { onClick: _this.remove, className: _this.props.className || "remove" },
                    ' \xD7 '
                )
            );
        };

        return _this;
    }

    return RIETag;
}(_react2.default.Component);

RIETag.propTypes = {
    text: _propTypes2.default.string.isRequired,
    removeHandler: _propTypes2.default.func,
    className: _propTypes2.default.string
};

var RIETags = function (_RIEStatefulBase) {
    _inherits(RIETags, _RIEStatefulBase);

    function RIETags(props) {
        _classCallCheck(this, RIETags);

        var _this2 = _possibleConstructorReturn(this, (RIETags.__proto__ || Object.getPrototypeOf(RIETags)).call(this, props));

        _this2.addTag = function (tag) {
            if ([].concat(_toConsumableArray(_this2.props.value)).length < (_this2.props.maxTags || 65535)) {
                _this2.commit(_this2.props.value.add(tag));
            }
        };

        _this2.removeTag = function (tag) {

            clearTimeout(_this2.state.blurTimer);

            if ([].concat(_toConsumableArray(_this2.props.value)).length >= (_this2.props.minTags || 1)) {
                var newSet = _this2.props.value;
                newSet.delete(tag);
                _this2.commit(newSet);
            }
        };

        _this2.componentWillReceiveProps = function (nextProps) {
            if ('value' in nextProps) _this2.setState({ loading: false, invalid: false });
        };

        _this2.keyDown = function (event) {
            if (event.keyCode === 8) {
                // Backspace
                if (event.target.value.length == 0) {
                    var tagToRemove = [].concat(_toConsumableArray(_this2.props.value)).pop();
                    _this2.removeTag(tagToRemove);
                }
            } else if (event.keyCode === 13) {
                // Enter
                event.preventDefault();
                if (event.target.value.length === 0) {
                    _this2.cancelEditing();
                } else {
                    _this2.addTag(event.target.value);
                    event.target.value = "";
                }
            } else if (event.keyCode === 27) {
                // Escape
                _this2.cancelEditing();
            }
        };

        _this2.cancelEditingDelayed = function () {
            _this2.setState({ blurTimer: setTimeout(_this2.cancelEditing, _this2.props.blurDelay || 180) });
        };

        _this2.cancelEditing = function () {
            _this2.setState({ editing: false, invalid: false });
        };

        _this2.componentDidUpdate = function (prevProps, prevState) {
            var inputElem = _reactDom2.default.findDOMNode(_this2.refs.input);
            if (_this2.state.editing) {
                inputElem.focus();
            }
        };

        _this2.renderNormalComponent = function () {
            var tags = [].concat(_toConsumableArray(_this2.props.value)).join(_this2.props.separator || ", ");
            return _react2.default.createElement(
                'span',
                _extends({
                    tabIndex: '0',
                    className: _this2.makeClassString(),
                    onFocus: _this2.startEditing
                }, _this2.props.defaultProps),
                tags
            );
        };

        _this2.makeTagElement = function (text) {
            return _react2.default.createElement(RIETag, { key: text, text: text, removeHandler: _this2.removeTag });
        };

        _this2.renderEditingComponent = function () {
            var elements = [].concat(_toConsumableArray(_this2.props.value)).map(_this2.makeTagElement);
            return _react2.default.createElement(
                'div',
                _extends({ tabIndex: '1', onClick: _this2.startEditing, className: _this2.makeClassString() }, _this2.props.editProps),
                elements,
                _react2.default.createElement('input', {
                    onBlur: _this2.cancelEditingDelayed,
                    onKeyDown: _this2.keyDown,
                    placeholder: _this2.props.placeholder || "New tag",
                    ref: 'input' })
            );
        };

        _this2.state.currentText = "";
        _this2.state.blurTimer = null;
        return _this2;
    }

    return RIETags;
}(_RIEStatefulBase3.default);

RIETags.propTyes = {
    value: _propTypes2.default.object.isRequired,
    maxTags: _propTypes2.default.number,
    minTags: _propTypes2.default.number,
    separator: _propTypes2.default.string,
    elementClass: _propTypes2.default.string,
    blurDelay: _propTypes2.default.number,
    placeholder: _propTypes2.default.string
};
exports.default = RIETags;