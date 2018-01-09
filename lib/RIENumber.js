'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var RIENumber = function (_RIEStatefulBase) {
  _inherits(RIENumber, _RIEStatefulBase);

  function RIENumber(props) {
    _classCallCheck(this, RIENumber);

    var _this = _possibleConstructorReturn(this, (RIENumber.__proto__ || Object.getPrototypeOf(RIENumber)).call(this, props));

    _this.validate = function (value) {
      return !isNaN(value) && isFinite(value) && value.length > 0;
    };

    _this.selectInputText = function (element) {
      setTimeout(function () {
        element.select();
      }, 10);
    };

    _this.getValue = function () {
      var _this$props = _this.props,
          format = _this$props.format,
          value = _this$props.value;
      var newValue = _this.state.newValue;


      if (format) {
        return format(newValue || value);
      }

      return newValue || value;
    };

    return _this;
  }

  _createClass(RIENumber, [{
    key: 'renderNormalComponent',
    value: function renderNormalComponent() {
      var defaultProps = this.props.defaultProps;


      return _react2.default.createElement(
        'span',
        _extends({
          tabIndex: '0',
          className: this.makeClassString(),
          onFocus: this.startEditing,
          onClick: this.startEditing
        }, defaultProps),
        this.getValue()
      );
    }
  }, {
    key: 'renderEditingComponent',
    value: function renderEditingComponent() {
      var value = this.props.value;


      return _react2.default.createElement('input', _extends({
        ref: 'input',
        type: 'number',
        disabled: this.isDisabled(),
        className: this.makeClassString(),
        defaultValue: value,
        onInput: this.textChanged,
        onBlur: this.finishEditing,
        onKeyDown: this.keyDown
      }, this.props.editProps));
    }
  }]);

  return RIENumber;
}(_RIEStatefulBase3.default);

RIENumber.propTypes = {
  format: _propTypes2.default.func
};

exports.default = RIENumber;