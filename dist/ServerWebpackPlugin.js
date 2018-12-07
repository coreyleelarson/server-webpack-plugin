"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cluster = _interopRequireDefault(require("cluster"));

var _logger = _interopRequireDefault(require("./utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ServerWebpackPlugin =
/*#__PURE__*/
function () {
  function ServerWebpackPlugin() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ServerWebpackPlugin);

    _defineProperty(this, "afterEmit", function (compilation, callback) {
      var _compilation$options$ = compilation.options.watch,
          watch = _compilation$options$ === void 0 ? false : _compilation$options$;

      var running = _this.worker && _this.worker.isConnected();

      if (!running) {
        _this.logger.debug('Starting server...');

        _this.logger.debug();

        return _this.startServer(compilation, callback);
      }

      if (watch) {
        _this.logger.debug();

        _this.logger.debug('Webpack rebuilt...');

        _this.logger.debug('Restarting server...');

        _this.logger.debug();

        return _this.restartServer(compilation, callback);
      }

      return callback();
    });

    _defineProperty(this, "startServer", function (compilation, callback) {
      _this.init(compilation, callback);
    });

    _defineProperty(this, "restartServer", function (compilation, callback) {
      _this.stopServer();

      _this.startServer(compilation, callback);
    });

    _defineProperty(this, "stopServer", function () {
      process.kill(_this.worker.process.pid, 'SIGUSR2');
    });

    _defineProperty(this, "init", function (compilation, callback) {
      var names = Object.keys(compilation.assets);
      var existsAt = compilation.assets[names[0]].existsAt;
      _this.entryPoint = existsAt;

      _this.exec(function (worker) {
        _this.worker = worker;
        callback();
      });
    });

    _defineProperty(this, "exec", function (callback) {
      _cluster.default.setupMaster({
        exec: _this.entryPoint
      });

      _cluster.default.on('online', function (worker) {
        callback(worker);
      });

      _cluster.default.fork();
    });

    this.options = options;
    this.logger = new _logger.default(options.logLevel);
  }

  _createClass(ServerWebpackPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var plugin = {
        name: 'ServerWebpackPlugin'
      };
      compiler.hooks.afterEmit.tapAsync(plugin, this.afterEmit);
    }
  }]);

  return ServerWebpackPlugin;
}();

var _default = ServerWebpackPlugin;
exports.default = _default;