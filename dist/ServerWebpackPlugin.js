"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cluster = _interopRequireDefault(require("cluster"));

var _path = _interopRequireDefault(require("path"));

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

    _defineProperty(this, "done", function (stats, callback) {
      var compilation = stats.compilation;
      var _this$options$disable = _this.options.disableWatch,
          disableWatch = _this$options$disable === void 0 ? false : _this$options$disable;

      var isRunning = _this.worker && _this.worker.isConnected();

      if (!isRunning) {
        _this.logger.debug('Starting server...');

        return _this.startServer(compilation, callback);
      }

      if (!disableWatch) {
        _this.logger.debug('Webpack rebuilt...');

        _this.logger.debug('Restarting server...');

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
      var _this$options$entryNa = _this.options.entryName,
          entryName = _this$options$entryNa === void 0 ? 'server' : _this$options$entryNa;
      var map = compilation.entrypoints;
      var entry = map.get ? map.get(entryName) : map[entryName];

      if (!entry) {
        _this.logger.error("Entry ".concat(entryName, " does not exist. Try one of: [").concat(Array.from(map.keys()).join(', '), "]"));

        return callback();
      }

      var fileName = entry.chunks[0].files[0];
      var buildPath = compilation.outputOptions.path;

      var filePath = _path.default.resolve(buildPath, fileName);

      _this.exec(filePath, callback);
    });

    _defineProperty(this, "exec", function (filePath, callback) {
      _cluster.default.setupMaster({
        exec: filePath
      });

      _cluster.default.on('online', function (worker) {
        _this.worker = worker;
        callback();
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
      compiler.hooks.done.tapAsync(plugin, this.done);
    }
  }]);

  return ServerWebpackPlugin;
}();

var _default = ServerWebpackPlugin;
exports.default = _default;