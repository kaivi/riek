'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

var RIETag = (function (_React$Component) {
    _inherits(RIETag, _React$Component);

    function RIETag(props) {
        var _this = this;

        _classCallCheck(this, RIETag);

        _get(Object.getPrototypeOf(RIETag.prototype), 'constructor', this).call(this, props);

        this.remove = function () {
            _this.props.removeHandler(_this.props.text);
        };

        this.render = function () {
            return _react2['default'].createElement(
                'div',
                { key: _this.props.text },
                _this.props.text,
                _react2['default'].createElement(
                    'div',
                    { onClick: _this.remove, className: _this.props.className || "remove" },
                    ' × '
                )
            );
        };
    }

    _createClass(RIETag, null, [{
        key: 'propTypes',
        value: {
            text: _react2['default'].PropTypes.string.isRequired,
            removeHandler: _react2['default'].PropTypes.func,
            className: _react2['default'].PropTypes.string
        },
        enumerable: true
    }]);

    return RIETag;
})(_react2['default'].Component);

var RIETags = (function (_RIEStatefulBase) {
    _inherits(RIETags, _RIEStatefulBase);

    function RIETags(props) {
        var _this2 = this;

        _classCallCheck(this, RIETags);

        _get(Object.getPrototypeOf(RIETags.prototype), 'constructor', this).call(this, props);

        this.addTag = function (tag) {
            if ([].concat(_toConsumableArray(_this2.props.value)).length < (_this2.props.maxTags || 65535)) {
                _this2.commit(_this2.props.value.add(tag));
            }
        };

        this.removeTag = function (tag) {

            clearTimeout(_this2.state.blurTimer);

            if ([].concat(_toConsumableArray(_this2.props.value)).length >= (_this2.props.minTags || 1)) {
                var newSet = _this2.props.value;
                newSet['delete'](tag);
                _this2.commit(newSet);
            }
        };

        this.componentWillReceiveProps = function (nextProps) {
            if ('value' in nextProps) _this2.setState({ loading: false, invalid: false });
        };

        this.keyDown = function (event) {
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

        this.cancelEditingDelayed = function () {
            _this2.setState({ blurTimer: setTimeout(_this2.cancelEditing, _this2.props.blurDelay || 180) });
        };

        this.cancelEditing = function () {
            _this2.setState({ editing: false, invalid: false });
        };

        this.componentDidUpdate = function (prevProps, prevState) {
            var inputElem = _react2['default'].findDOMNode(_this2.refs.input);
            if (_this2.state.editing) {
                inputElem.focus();
            }
        };

        this.renderNormalComponent = function () {
            var tags = [].concat(_toConsumableArray(_this2.props.value)).join(_this2.props.separator || ", ");
            return _react2['default'].createElement(
                'span',
                {
                    tabIndex: '0',
                    className: _this2.makeClassString(),
                    onFocus: _this2.startEditing },
                tags
            );
        };

        this.makeTagElement = function (text) {
            return _react2['default'].createElement(RIETag, { key: text, text: text, removeHandler: _this2.removeTag });
        };

        this.renderEditingComponent = function () {
            var elements = [].concat(_toConsumableArray(_this2.props.value)).map(_this2.makeTagElement);
            return _react2['default'].createElement(
                'div',
                { tabIndex: '1', onClick: _this2.startEditing, className: _this2.makeClassString() },
                elements,
                _react2['default'].createElement('input', {
                    onBlur: _this2.cancelEditingDelayed,
                    onKeyDown: _this2.keyDown,
                    placeholder: _this2.props.placeholder || "New tag",
                    ref: 'input' })
            );
        };

        this.state.currentText = "";
        this.state.blurTimer = null;
    }

    _createClass(RIETags, null, [{
        key: 'propTypes',
        value: {
            value: _react2['default'].PropTypes.object.isRequired,
            maxTags: _react2['default'].PropTypes.number,
            minTags: _react2['default'].PropTypes.number,
            separator: _react2['default'].PropTypes.string,
            elementClass: _react2['default'].PropTypes.string,
            blurDelay: _react2['default'].PropTypes.number,
            placeholder: _react2['default'].PropTypes.string
        },
        enumerable: true
    }]);

    return RIETags;
})(_RIEStatefulBase3['default']);

exports['default'] = RIETags;
module.exports = exports['default'];