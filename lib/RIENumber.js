'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIENumber = function (_RIEStatefulBase) {
    _inherits(RIENumber, _RIEStatefulBase);

    function RIENumber(props) {
        _classCallCheck(this, RIENumber);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RIENumber).call(this, props));

        _this.validate = function (value) {
            return !isNaN(value) && isFinite(value) && value.length > 0;
        };

        _this.renderNormalComponent = function () {
            return _react2.default.createElement(
                'span',
                {
                    tabIndex: '0',
                    className: _this.makeClassString(),
                    onFocus: _this.startEditing,
                    onClick: _this.startEditing },
                _this.props.format ? _this.props.format(_this.state.newValue || _this.props.value) : _this.state.newValue || _this.props.value
            );
        };

        _this.renderEditingComponent = function () {
            return _react2.default.createElement('input', { disabled: _this.props.shouldBlockWhileLoading && _this.state.loading,
                type: 'number',
                className: _this.makeClassString(),
                defaultValue: _this.props.value,
                onInput: _this.textChanged,
                onBlur: _this.finishEditing,
                ref: 'input',
                onKeyDown: _this.keyDown });
        };

        return _this;
    }

    return RIENumber;
}(_RIEStatefulBase3.default);

RIENumber.propTypes = {
    format: _react2.default.PropTypes.func
};
exports.default = RIENumber;