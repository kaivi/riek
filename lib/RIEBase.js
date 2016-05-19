"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RIEBase).call(this, props));

        _this.doValidations = function (value) {
            if (_this.props.validate) {
                _this.setState({ invalid: !_this.props.validate(value) });
            } else if (_this.validate) {
                _this.setState({ invalid: !_this.validate(value) });
            }
        };

        _this.selectInputText = function (element) {
            element.setSelectionRange(0, element.value.length);
        };

        _this.elementClick = function (event) {
            throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate et.c";
        };

        _this.componentWillReceiveProps = function (nextProps) {
            if ('value' in nextProps) _this.setState({ loading: false, editing: false, invalid: false, newValue: null });
        };

        _this.commit = function (value) {
            if (!_this.state.invalid) {
                var newProp = {};
                newProp[_this.props.propName] = value;
                _this.setState({ loading: true, newValue: value });
                _this.props.change(newProp);
            }
        };

        _this.makeClassString = function () {
            var classNames = [];
            if (_this.props.className) classNames.push(_this.props.className);
            if (_this.state.editing && _this.props.classEditing) classNames.push(_this.props.classEditing);
            if (_this.state.loading && _this.props.classLoading) classNames.push(_this.props.classLoading);
            if (_this.state.disabled && _this.props.classDisabled) classNames.push(_this.props.classDisabled);
            if (_this.state.invalid && _this.props.classInvalid) classNames.push(_this.props.classInvalid);
            return classNames.join(' ');
        };

        _this.render = function () {
            return _react2.default.createElement(
                "span",
                { tabindex: "0", className: _this.makeClassString(), onClick: _this.elementClick },
                _this.props.value
            );
        };

        if (!_this.props.propName) throw "RTFM: missing 'propName' prop";
        if (!_this.props.change) throw "RTFM: missing 'change' prop";
        if (_this.props.value == undefined) throw "RTFM: missing 'value' prop";

        _this.state = {
            editing: false,
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
    isDisabled: _react2.default.PropTypes.bool,
    validate: _react2.default.PropTypes.func,
    shouldBlockWhileLoading: _react2.default.PropTypes.bool,
    classLoading: _react2.default.PropTypes.string,
    classEditing: _react2.default.PropTypes.string,
    classDisabled: _react2.default.PropTypes.string,
    classInvalid: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string
};
exports.default = RIEBase;
exports.default = RIEBase;