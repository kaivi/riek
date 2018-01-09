'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (RIEStatefulBase.__proto__ || Object.getPrototypeOf(RIEStatefulBase)).call(this, props));

    _this.startEditing = function () {
      _this.setState({
        editing: true
      });
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
      _this.setState({
        editing: false,
        invalid: false
      });
    };

    _this.keyDown = function (event) {
      switch (event.keyCode) {
        case RIEStatefulBase.KEY_ENTER:
          _this.finishEditing();
          break;
        case RIEStatefulBase.KEY_ESCAPE:
          _this.cancelEditing();
          break;
      }
    };

    _this.textChanged = function (event) {
      _this.doValidations(event.target.value.trim());
    };

    _this.elementBlur = function () {
      _this.finishEditing();
    };

    _this.elementClick = function (event) {
      _this.startEditing();
      event.target.element.focus();
    };

    _this.isDisabled = function () {
      return _this.props.shouldBlockWhileLoading && _this.state.loading;
    };

    return _this;
  }

  _createClass(RIEStatefulBase, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var inputElem = _reactDom2.default.findDOMNode(this.refs.input);
      if (this.state.editing && !prevState.editing) {
        inputElem.focus();
        this.selectInputText(inputElem);
      } else if (this.state.editing && prevProps.text !== this.props.text) {
        this.finishEditing();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.editing) {
        return this.renderEditingComponent();
      }

      return this.renderNormalComponent();
    }
  }, {
    key: 'renderNormalComponent',
    value: function renderNormalComponent() {
      var _props = this.props,
          defaultProps = _props.defaultProps,
          value = _props.value;


      return _react2.default.createElement(
        'span',
        _extends({
          tabIndex: '0',
          className: this.makeClassString(),
          onFocus: this.startEditing,
          onClick: this.startEditing
        }, defaultProps),
        this.state.newValue || value
      );
    }
  }, {
    key: 'renderEditingComponent',
    value: function renderEditingComponent() {
      var _props2 = this.props,
          editProps = _props2.editProps,
          value = _props2.value;


      return _react2.default.createElement('input', _extends({
        ref: 'input',
        defaultValue: value,
        disabled: this.isDisabled(),
        className: this.makeClassString(),
        onInput: this.textChanged,
        onBlur: this.finishEditing,
        onKeyDown: this.keyDown
      }, editProps));
    }
  }]);

  return RIEStatefulBase;
}(_RIEBase3.default);

exports.default = RIEStatefulBase;