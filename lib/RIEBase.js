"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIEBase = function (_React$Component) {
    _inherits(RIEBase, _React$Component);

    function RIEBase(props) {
        _classCallCheck(this, RIEBase);

        var _this = _possibleConstructorReturn(this, (RIEBase.__proto__ || Object.getPrototypeOf(RIEBase)).call(this, props));

        _initialiseProps.call(_this);

        if (!_this.props.propName) throw "RTFM: missing 'propName' prop";
        if (!_this.props.change) throw "RTFM: missing 'change' prop";
        if (_this.props.value == undefined) throw "RTFM: missing 'value' prop";

        var editing = _this.props.editing == null ? false : _this.props.editing;

        _this.state = {
            editing: editing,
            loading: false,
            disabled: false,
            invalid: false
        };
        return _this;
    }

    return RIEBase;
}(_react2.default.Component);

RIEBase.propTypes = {
    value: _react2.default.PropTypes.any.isRequired,
    change: _react2.default.PropTypes.func.isRequired,
    propName: _react2.default.PropTypes.string.isRequired,
    editProps: _react2.default.PropTypes.object,
    defaultProps: _react2.default.PropTypes.object,
    isDisabled: _react2.default.PropTypes.bool,
    validate: _react2.default.PropTypes.func,
    shouldBlockWhileLoading: _react2.default.PropTypes.bool,
    classLoading: _react2.default.PropTypes.string,
    classEditing: _react2.default.PropTypes.string,
    classDisabled: _react2.default.PropTypes.string,
    classInvalid: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.doValidations = function (value) {
        if (_this2.props.validate) {
            _this2.setState({ invalid: !_this2.props.validate(value) });
        } else if (_this2.validate) {
            _this2.setState({ invalid: !_this2.validate(value) });
        }
    };

    this.selectInputText = function (element) {
        if (element.setSelectionRange) element.setSelectionRange(0, element.value.length);
    };

    this.elementClick = function (event) {
        throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate et.c";
    };

    this.componentWillReceiveProps = function (nextProps) {
        var editing = nextProps.editing == null ? false : nextProps.editing;
        if ('value' in nextProps) _this2.setState({ loading: false, editing: editing, invalid: false, newValue: null });
    };

    this.commit = function (value) {
        if (!_this2.state.invalid) {
            var newProp = {};
            newProp[_this2.props.propName] = value;
            _this2.setState({ loading: true, newValue: value });
            _this2.props.change(newProp);
        }
    };

    this.makeClassString = function () {
        var classNames = [];
        if (_this2.props.className) classNames.push(_this2.props.className);
        if (_this2.state.editing && _this2.props.classEditing) classNames.push(_this2.props.classEditing);
        if (_this2.state.loading && _this2.props.classLoading) classNames.push(_this2.props.classLoading);
        if (_this2.state.disabled && _this2.props.classDisabled) classNames.push(_this2.props.classDisabled);
        if (_this2.state.invalid && _this2.props.classInvalid) classNames.push(_this2.props.classInvalid);
        return classNames.join(' ');
    };

    this.render = function () {
        return _react2.default.createElement(
            "span",
            _extends({}, _this2.props.defaultProps, { tabindex: "0", className: _this2.makeClassString(), onClick: _this2.elementClick }),
            _this2.props.value
        );
    };
};

exports.default = RIEBase;