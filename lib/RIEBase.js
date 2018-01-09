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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIEBase = function (_React$Component) {
  _inherits(RIEBase, _React$Component);

  function RIEBase(props) {
    _classCallCheck(this, RIEBase);

    var _this = _possibleConstructorReturn(this, (RIEBase.__proto__ || Object.getPrototypeOf(RIEBase)).call(this, props));

    _this.doValidations = function (value) {
      var validate = _this.props.validate;


      if (validate) {
        _this.setState({
          invalid: !validate(value)
        });
      } else if (_this.validate) {
        _this.setState({
          invalid: !_this.validate(value)
        });
      }
    };

    _this.selectInputText = function (element) {
      if (element.setSelectionRange) {
        element.setSelectionRange(0, element.value.length);
      }
    };

    _this.commit = function (value) {
      if (_this.state.invalid) {
        return;
      }

      _this.setState({
        loading: true,
        newValue: value
      });

      _this.props.change(_defineProperty({}, _this.props.propName, value));
    };

    _this.makeClassString = function () {
      var _classNames;

      var _this$props = _this.props,
          className = _this$props.className,
          classEditing = _this$props.classEditing,
          classLoading = _this$props.classLoading,
          classInvalid = _this$props.classInvalid,
          classDisabled = _this$props.classDisabled;


      return (0, _classnames2.default)(className, (_classNames = {}, _defineProperty(_classNames, classEditing, _this.state.editing && classEditing), _defineProperty(_classNames, classLoading, _this.state.loading && classLoading), _defineProperty(_classNames, classDisabled, _this.state.disabled && classDisabled), _defineProperty(_classNames, classInvalid, _this.state.invalid && classInvalid), _classNames));
    };

    _this.elementClick = function () {
      throw Error('RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate etc');
    };

    if (!_this.props.propName) {
      throw Error("RTFM: missing 'propName' prop");
    }

    if (!_this.props.change) {
      throw Error("RTFM: missing 'change' prop");
    }

    if (_this.props.value === undefined) {
      throw Error("RTFM: missing 'value' prop");
    }

    _this.state = {
      editing: false,
      loading: false,
      disabled: false,
      invalid: false
    };
    return _this;
  }

  _createClass(RIEBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          loading: false,
          editing: false,
          invalid: false,
          newValue: null
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          defaultProps = _props.defaultProps,
          value = _props.value;


      return _react2.default.createElement(
        'span',
        _extends({}, defaultProps, {
          className: this.makeClassString(),
          onClick: this.elementClick
        }),
        value
      );
    }
  }]);

  return RIEBase;
}(_react2.default.Component);

RIEBase.KEY_ENTER = 13;
RIEBase.KEY_ESCAPE = 27;
RIEBase.KEY_BACKSPACE = 8;


RIEBase.propTypes = {
  value: _propTypes2.default.any.isRequired,
  change: _propTypes2.default.func.isRequired,
  propName: _propTypes2.default.string.isRequired,
  editProps: _propTypes2.default.object,
  defaultProps: _propTypes2.default.object,
  isDisabled: _propTypes2.default.bool,
  validate: _propTypes2.default.func,
  shouldBlockWhileLoading: _propTypes2.default.bool,
  classLoading: _propTypes2.default.string,
  classEditing: _propTypes2.default.string,
  classDisabled: _propTypes2.default.string,
  classInvalid: _propTypes2.default.string,
  className: _propTypes2.default.string
};

exports.default = RIEBase;