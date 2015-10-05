'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RIEBase2 = require('./RIEBase');

var _RIEBase3 = _interopRequireDefault(_RIEBase2);

var RIEStatefulBase = (function (_RIEBase) {
    _inherits(RIEStatefulBase, _RIEBase);

    function RIEStatefulBase(props) {
        var _this = this;

        _classCallCheck(this, RIEStatefulBase);

        _get(Object.getPrototypeOf(RIEStatefulBase.prototype), 'constructor', this).call(this, props);

        this.startEditing = function () {
            _this.setState({ editing: true });
        };

        this.finishEditing = function () {
            var newValue = _react2['default'].findDOMNode(_this.refs.input).value;
            _this.doValidations(newValue);
            if (!_this.state.invalid && _this.props.value !== newValue) {
                _this.commit(newValue);
            }
            _this.cancelEditing();
        };

        this.cancelEditing = function () {
            _this.setState({ editing: false, invalid: false });
        };

        this.keyDown = function (event) {
            if (event.keyCode === 13) {
                _this.finishEditing();
            } // Enter
            else if (event.keyCode === 27) {
                    _this.cancelEditing();
                } // Escape
        };

        this.textChanged = function (event) {
            console.log(event.target.value);
            _this.doValidations(event.target.value.trim());
        };

        this.componentDidUpdate = function (prevProps, prevState) {
            var inputElem = _react2['default'].findDOMNode(_this.refs.input);
            if (_this.state.editing && !prevState.editing) {
                inputElem.focus();
                _this.selectInputText(inputElem);
            } else if (_this.state.editing && prevProps.text != _this.props.text) {
                _this.finishEditing();
            }
        };

        this.renderEditingComponent = function () {
            return _react2['default'].createElement('input', {
                disabled: _this.state.loading,
                className: _this.makeClassString(),
                defaultValue: _this.props.value,
                onInput: _this.textChanged,
                onBlur: _this.finishEditing,
                ref: 'input',
                onKeyDown: _this.keyDown });
        };

        this.renderNormalComponent = function () {
            return _react2['default'].createElement(
                'span',
                {
                    tabIndex: '0',
                    className: _this.makeClassString(),
                    onFocus: _this.startEditing,
                    onClick: _this.startEditing },
                _this.state.newValue || _this.props.value
            );
        };

        this.elementBlur = function (event) {
            _this.finishEditing();
        };

        this.elementClick = function (event) {
            _this.startEditing();
            event.target.element.focus();
        };

        this.render = function () {
            if (_this.state.editing) {
                return _this.renderEditingComponent();
            } else {
                return _this.renderNormalComponent();
            }
        };
    }

    return RIEStatefulBase;
})(_RIEBase3['default']);

exports['default'] = RIEStatefulBase;
module.exports = exports['default'];