'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('RIENumber');

var RIENumber = function (_RIEStatefulBase) {
    _inherits(RIENumber, _RIEStatefulBase);

    function RIENumber(props) {
        _classCallCheck(this, RIENumber);

        var _this = _possibleConstructorReturn(this, (RIENumber.__proto__ || Object.getPrototypeOf(RIENumber)).call(this, props));

        _this.validate = function (value) {
            debug('validate(' + value + ')');
            return !isNaN(value) && isFinite(value) && value.length > 0;
        };

        _this.selectInputText = function (element) {
            debug('selectInputText(' + element + ')');
            // element.setSelectionRange won't work for an input of type "number"
            setTimeout(function () {
                element.select();
            }, 10);
        };

        _this.elementBlur = function (element) {
            debug('elementBlur(' + element + ')');
            /*  
                        Firefox workaround
                        Found at https://tirdadc.github.io/blog/2015/06/11/react-dot-js-firefox-issue-with-onblur/
            */
            if (element.nativeEvent.explicitOriginalTarget && element.nativeEvent.explicitOriginalTarget == element.nativeEvent.originalTarget) {
                return;
            }
            _this.finishEditing();
        };

        _this.renderNormalComponent = function () {
            debug('renderNormalComponent()');
            return _react2.default.createElement(
                'span',
                _extends({
                    tabIndex: '0',
                    className: _this.makeClassString(),
                    onFocus: _this.startEditing,
                    onClick: _this.elementClick
                }, _this.props.defaultProps),
                _this.props.format ? _this.props.format(_this.state.newValue || _this.props.value) : _this.state.newValue || _this.props.value
            );
        };

        _this.renderEditingComponent = function () {
            debug('renderEditingComponent()');
            return _react2.default.createElement('input', _extends({ disabled: _this.props.shouldBlockWhileLoading && _this.state.loading,
                type: 'number',
                className: _this.makeClassString(),
                defaultValue: _this.props.value,
                onInput: _this.textChanged,
                onBlur: _this.elementBlur,
                ref: 'input',
                onKeyDown: _this.keyDown
            }, _this.props.editProps));
        };

        return _this;
    }

    return RIENumber;
}(_RIEStatefulBase3.default);

RIENumber.propTypes = {
    format: _propTypes2.default.func
};
exports.default = RIENumber;