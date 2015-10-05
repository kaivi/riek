'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _RIEToggle = require('./RIEToggle');

var _RIEToggle2 = _interopRequireDefault(_RIEToggle);

var _RIEStatefulBase2 = require('./RIEStatefulBase');

var _RIEStatefulBase3 = _interopRequireDefault(_RIEStatefulBase2);

var _RIENumber = require('./RIENumber');

var _RIENumber2 = _interopRequireDefault(_RIENumber);

var _RIETags = require('./RIETags');

var _RIETags2 = _interopRequireDefault(_RIETags);

var RIEInput = (function (_RIEStatefulBase) {
  _inherits(RIEInput, _RIEStatefulBase);

  function RIEInput() {
    _classCallCheck(this, RIEInput);

    _get(Object.getPrototypeOf(RIEInput.prototype), 'constructor', this).apply(this, arguments);
  }

  return RIEInput;
})(_RIEStatefulBase3['default']);

exports.RIEToggle = _RIEToggle2['default'];
exports.RIEInput = RIEInput;
exports.RIENumber = _RIENumber2['default'];
exports.RIETags = _RIETags2['default'];