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

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

var RIENumber = (function (_RIEStatefulBase) {
    _inherits(RIENumber, _RIEStatefulBase);

    function RIENumber(props) {
        var _this = this;

        _classCallCheck(this, RIENumber);

        _get(Object.getPrototypeOf(RIENumber.prototype), 'constructor', this).call(this, props);

        this.validate = function (value) {
            return !isNaN(value) && isFinite(value) && value.length > 0;
        };

        this.renderNormalComponent = function () {
            return _react2['default'].createElement(
                'span',
                {
                    tabIndex: '0',
                    className: _this.makeClassString(),
                    onFocus: _this.startEditing,
                    onClick: _this.startEditing },
                _this.props.format ? _this.props.format(_this.state.newValue || _this.props.value) : _this.state.newValue || _this.props.value
            );
        };

        this.renderEditingComponent = function () {
            return _react2['default'].createElement('input', { disabled: _this.props.shouldBlockWhileLoading && _this.state.loading,
                className: _this.makeClassString(),
                defaultValue: _this.props.value,
                onInput: _this.textChanged,
                onBlur: _this.finishEditing,
                ref: 'input',
                onKeyDown: _this.keyDown });
        };
    }

    _createClass(RIENumber, null, [{
        key: 'propTypes',
        value: {
            format: _react2['default'].PropTypes.func
        },
        enumerable: true
    }]);

    return RIENumber;
})(_RIEStatefulBase3['default']);

exports['default'] = RIENumber;
module.exports = exports['default'];