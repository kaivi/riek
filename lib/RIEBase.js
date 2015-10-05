"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var RIEBase = (function (_React$Component) {
    _inherits(RIEBase, _React$Component);

    function RIEBase(props) {
        var _this = this;

        _classCallCheck(this, RIEBase);

        _get(Object.getPrototypeOf(RIEBase.prototype), "constructor", this).call(this, props);

        this.doValidations = function (value) {
            if (_this.props.validate) {
                console.log('doing validations from props');
                _this.setState({ invalid: !_this.props.validate(value) });
            } else if (_this.validate) {
                console.log('doing default valudations');
                _this.setState({ invalid: !_this.validate(value) });
            }
        };

        this.selectInputText = function (element) {
            element.setSelectionRange(0, element.value.length);
        };

        this.elementClick = function (event) {
            throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate et.c";
        };

        this.componentWillReceiveProps = function (nextProps) {
            if ('value' in nextProps) _this.setState({ loading: false, editing: false, invalid: false, newValue: null });
        };

        this.commit = function (value) {
            if (!_this.state.invalid) {
                var newProp = {};
                newProp[_this.props.propName] = value;
                _this.setState({ loading: true, newValue: value });
                _this.props.change(newProp);
            }
        };

        this.makeClassString = function () {
            var classNames = [];
            if (_this.props.className) classNames.push(_this.props.className);
            if (_this.state.editing && _this.props.classEditing) classNames.push(_this.props.classEditing);
            if (_this.state.loading && _this.props.classLoading) classNames.push(_this.props.classLoading);
            if (_this.state.disabled && _this.props.classDisabled) classNames.push(_this.props.classDisabled);
            if (_this.state.invalid && _this.props.classInvalid) classNames.push(_this.props.classInvalid);
            return classNames.join(' ');
        };

        this.render = function () {
            return _react2["default"].createElement(
                "span",
                { tabindex: "0", className: _this.makeClassString(), onClick: _this.elementClick },
                _this.props.value
            );
        };

        if (!this.props.propName) throw "RTFM: missing 'propName' prop";
        if (!this.props.change) throw "RTFM: missing 'change' prop";
        if (this.props.value == undefined) throw "RTFM: missing 'value' prop";

        this.state = {
            editing: false,
            loading: false,
            disabled: false,
            invalid: false
        };
    }

    _createClass(RIEBase, null, [{
        key: "propTypes",
        value: {
            value: _react2["default"].PropTypes.any.isRequired,
            change: _react2["default"].PropTypes.func.isRequired,
            propName: _react2["default"].PropTypes.string.isRequired,
            isDisabled: _react2["default"].PropTypes.bool,
            validate: _react2["default"].PropTypes.func,
            shouldBlockWhileLoading: _react2["default"].PropTypes.bool,
            classLoading: _react2["default"].PropTypes.string,
            classEditing: _react2["default"].PropTypes.string,
            classDisabled: _react2["default"].PropTypes.string,
            classInvalid: _react2["default"].PropTypes.string,
            className: _react2["default"].PropTypes.string
        },
        enumerable: true
    }]);

    return RIEBase;
})(_react2["default"].Component);

exports["default"] = RIEBase;
exports["default"] = RIEBase;
module.exports = exports["default"];