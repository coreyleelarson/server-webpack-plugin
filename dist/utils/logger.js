"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _loglevel = _interopRequireDefault(require("loglevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var log = function log(_ref) {
  var color = _ref.color,
      level = _ref.level,
      message = _ref.message;
  message.length ? level(_chalk.default.bold('[ServerWebpackPlugin] >'), color.apply(void 0, _toConsumableArray(message))) : level('');
};

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Logger);

    _loglevel.default.setLevel(_loglevel.default.levels[level.toUpperCase()] || _loglevel.default.levels.DEBUG);
  }

  _createClass(Logger, [{
    key: "trace",
    value: function trace() {
      for (var _len = arguments.length, message = new Array(_len), _key = 0; _key < _len; _key++) {
        message[_key] = arguments[_key];
      }

      log({
        level: _loglevel.default.trace,
        color: _chalk.default.white,
        message: message
      });
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        message[_key2] = arguments[_key2];
      }

      log({
        level: _loglevel.default.debug,
        color: _chalk.default.blue,
        message: message
      });
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        message[_key3] = arguments[_key3];
      }

      log({
        level: _loglevel.default.info,
        color: _chalk.default.green,
        message: message
      });
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        message[_key4] = arguments[_key4];
      }

      log({
        level: _loglevel.default.warn,
        color: _chalk.default.yellow,
        message: message
      });
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len5 = arguments.length, message = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        message[_key5] = arguments[_key5];
      }

      log({
        level: _loglevel.default.error,
        color: _chalk.default.red,
        message: message
      });
    }
  }]);

  return Logger;
}();

var _default = Logger;
exports.default = _default;