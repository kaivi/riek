'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RIEBase2 = require('./RIEBase');

var _RIEBase3 = _interopRequireDefault(_RIEBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RIEToggle = function (_RIEBase) {
    _inherits(RIEToggle, _RIEBase);

    function RIEToggle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RIEToggle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RIEToggle.__proto__ || Object.getPrototypeOf(RIEToggle)).call.apply(_ref, [this].concat(args))), _this), _this.elementClick = function (e) {
            _this.setState({ value: !_this.props.value });
            _this.commit(!_this.props.value);
        }, _this.render = function () {
            var valueToRender = _this.state.loading ? _this.state.value : _this.props.value;
            return _react2.default.createElement(
                'span',
                {
                    tabIndex: '0',
                    onKeyPress: _this.elementClick,
                    onClick: _this.elementClick,
                    className: _this.makeClassString() },
                valueToRender ? _this.props.textTrue || 'yes' : _this.props.textFalse || 'no'
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return RIEToggle;
}(_RIEBase3.default);

RIEToggle.propTypes = {
    textTrue: _react2.default.PropTypes.string,
    textFalse: _react2.default.PropTypes.string
};
exports.default = RIEToggle;