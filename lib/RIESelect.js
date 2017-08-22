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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIESelect = function (_RIEStatefulBase) {
    _inherits(RIESelect, _RIEStatefulBase);

    function RIESelect() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RIESelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RIESelect.__proto__ || Object.getPrototypeOf(RIESelect)).call.apply(_ref, [this].concat(args))), _this), _this.finishEditing = function () {
            // get the object from options that matches user selected value
            var newValue = _this.props.options.find(function (option) {
                return option.id === _reactDom2.default.findDOMNode(this.refs.input).value;
            }, _this);
            _this.doValidations(newValue);
            if (!_this.state.invalid && _this.props.value !== newValue) {
                _this.commit(newValue);
            }
            _this.cancelEditing();
        }, _this.renderEditingComponent = function () {
            var optionNodes = _this.props.options.map(function (option) {
                return _react2.default.createElement(
                    'option',
                    { value: option.id, key: option.id },
                    option.text
                );
            });

            return _react2.default.createElement(
                'select',
                _extends({ disabled: _this.props.shouldBlockWhileLoading && _this.state.loading,
                    value: _this.props.value.id,
                    className: _this.makeClassString(),
                    onChange: _this.finishEditing,
                    onBlur: _this.cancelEditing,
                    ref: 'input',
                    onKeyDown: _this.keyDown
                }, _this.props.editProps),
                optionNodes
            );
        }, _this.renderNormalComponent = function () {
            return _react2.default.createElement(
                'span',
                _extends({
                    tabIndex: '0',
                    className: _this.makeClassString(),
                    onFocus: _this.startEditing,
                    onClick: _this.startEditing
                }, _this.props.defaultProps),
                !!_this.state.newValue ? _this.state.newValue.text : _this.props.value.text
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return RIESelect;
}(_RIEStatefulBase3.default);

RIESelect.propTypes = {
    options: _propTypes2.default.array.isRequired
};
exports.default = RIESelect;