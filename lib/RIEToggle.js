'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RIEBase2 = require('./RIEBase');

var _RIEBase3 = _interopRequireDefault(_RIEBase2);

var RIEToggle = (function (_RIEBase) {
    _inherits(RIEToggle, _RIEBase);

    function RIEToggle() {
        var _this = this;

        _classCallCheck(this, RIEToggle);

        _get(Object.getPrototypeOf(RIEToggle.prototype), 'constructor', this).apply(this, arguments);

        this.elementClick = function (e) {
            _this.setState({ value: !_this.props.value });
            _this.commit(!_this.props.value);
        };

        this.render = function () {
            var valueToRender = _this.state.loading ? _this.state.value : _this.props.value;
            return _react2['default'].createElement(
                'span',
                {
                    tabIndex: '0',
                    onKeyPress: _this.elementClick,
                    onClick: _this.elementClick,
                    className: _this.makeClassString() },
                valueToRender ? _this.props.textTrue || 'yes' : _this.props.textFalse || 'no'
            );
        };
    }

    _createClass(RIEToggle, null, [{
        key: 'propTypes',
        value: {
            textTrue: _react2['default'].PropTypes.string,
            textFalse: _react2['default'].PropTypes.string
        },
        enumerable: true
    }]);

    return RIEToggle;
})(_RIEBase3['default']);

exports['default'] = RIEToggle;
module.exports = exports['default'];