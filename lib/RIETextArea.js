'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

var _RIEBase = require('./RIEBase');

var _RIEBase2 = _interopRequireDefault(_RIEBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIETextArea = function (_RIEStatefulBase) {
  _inherits(RIETextArea, _RIEStatefulBase);

  function RIETextArea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RIETextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RIETextArea.__proto__ || Object.getPrototypeOf(RIETextArea)).call.apply(_ref, [this].concat(args))), _this), _this.transformNewlineToBr = function () {
      var value = String(_this.state.newValue || _this.props.value);
      var spansAndBreaks = [];
      var i = 0;

      value.split('\n').forEach(function (line) {
        spansAndBreaks.push(_react2.default.createElement(
          'span',
          { key: i },
          line
        ));
        spansAndBreaks.push(_react2.default.createElement('br', { key: i + 1 }));
        i += 2;
      });

      spansAndBreaks.pop(); // remove last br tag
      return spansAndBreaks;
    }, _this.keyDown = function (event) {
      if (event.keyCode === _RIEBase2.default.KEY_ESCAPE) {
        _this.cancelEditing();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RIETextArea, [{
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
        this.transformNewlineToBr()
      );
    }
  }, {
    key: 'renderEditingComponent',
    value: function renderEditingComponent() {
      var _props = this.props,
          rows = _props.rows,
          cols = _props.cols,
          value = _props.value,
          editProps = _props.editProps;


      return _react2.default.createElement('textarea', _extends({
        ref: 'input',
        rows: rows,
        cols: cols,
        defaultValue: value,
        disabled: this.isDisabled(),
        className: this.makeClassString(),
        onInput: this.textChanged,
        onBlur: this.finishEditing,
        onKeyDown: this.keyDown
      }, editProps));
    }
  }]);

  return RIETextArea;
}(_RIEStatefulBase3.default);

exports.default = RIETextArea;