'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _RIEBase2 = require('./RIEBase');

var _RIEBase3 = _interopRequireDefault(_RIEBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIEStatefulBase = function (_RIEBase) {
    _inherits(RIEStatefulBase, _RIEBase);

    function RIEStatefulBase(props) {
        _classCallCheck(this, RIEStatefulBase);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RIEStatefulBase).call(this, props));

        _this.startEditing = function () {
            _this.setState({ editing: true });
        };

        _this.finishEditing = function () {
            var newValue = _reactDom2.default.findDOMNode(_this.refs.input).value;
            _this.doValidations(newValue);
            if (!_this.state.invalid && _this.props.value !== newValue) {
                _this.commit(newValue);
            }
            _this.cancelEditing();
        };

        _this.cancelEditing = function () {
            _this.setState({ editing: false, invalid: false });
        };

        _this.keyDown = function (event) {
            if (event.keyCode === 13) {
                _this.finishEditing();
            } // Enter
            else if (event.keyCode === 27) {
                    _this.cancelEditing();
                } // Escape
        };

        _this.textChanged = function (event) {
            _this.doValidations(event.target.value.trim());
        };

        _this.componentDidUpdate = function (prevProps, prevState) {
            var inputElem = _reactDom2.default.findDOMNode(_this.refs.input);
            if (_this.state.editing && !prevState.editing) {
                inputElem.focus();
                _this.selectInputText(inputElem);
            } else if (_this.state.editing && prevProps.text != _this.props.text) {
                _this.finishEditing();
            }
        };

        _this.renderEditingComponent = function () {
            return _react2.default.createElement('input', {
                disabled: _this.state.loading,
                className: _this.makeClassString(),
                defaultValue: _this.props.value,
                onInput: _this.textChanged,
                onBlur: _this.finishEditing,
                ref: 'input',
                onKeyDown: _this.keyDown });
        };

        _this.renderNormalComponent = function () {
            return _react2.default.createElement(
                'span',
                {
                    tabIndex: '0',
                    className: _this.makeClassString(),
                    onFocus: _this.startEditing,
                    onClick: _this.startEditing },
                _this.state.newValue || _this.props.value
            );
        };

        _this.elementBlur = function (event) {
            _this.finishEditing();
        };

        _this.elementClick = function (event) {
            _this.startEditing();
            event.target.element.focus();
        };

        _this.render = function () {
            if (_this.state.editing) {
                return _this.renderEditingComponent();
            } else {
                return _this.renderNormalComponent();
            }
        };

        return _this;
    }

    return RIEStatefulBase;
}(_RIEBase3.default);

exports.default = RIEStatefulBase;