import cluster from 'cluster';
import Logger from './utils/logger';

class ServerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
    this.logger = new Logger(options.logLevel);
  }

  apply(compiler) {
    const plugin = { name: 'ServerWebpackPlugin' };
    compiler.hooks.afterEmit.tapAsync(plugin, this.afterEmit);
  }

  afterEmit = (compilation, callback) => {
    const { watch = false } = compilation.options;
    const running = this.worker && this.worker.isConnected();

    if (!running) {
      this.logger.debug('Starting server...');
      this.logger.debug();
      return this.startServer(compilation, callback);
    }

    if (watch) {
      this.logger.debug();
      this.logger.debug('Webpack rebuilt...');
      this.logger.debug('Restarting server...');
      this.logger.debug();
      return this.restartServer(compilation, callback);
    }

    return callback();
  }

  startServer = (compilation, callback) => {
    this.init(compilation, callback);
  }

  restartServer = (compilation, callback) => {
    this.stopServer();
    this.startServer(compilation, callback);
  }

  stopServer = () => {
    process.kill(this.worker.process.pid, 'SIGUSR2');
  }

  init = (compilation, callback) => {
    const names = Object.keys(compilation.assets);
    const { existsAt } = compilation.assets[names[0]];
    
    this.entryPoint = existsAt;

    this.exec(worker => {
      this.worker = worker;
      callback();
    });
  }

  exec = (callback) => {
    cluster.setupMaster({
      exec: this.entryPoint,
    });

    cluster.on('online', worker => {
      callback(worker);
    });

    cluster.fork();
  }
}

export default ServerWebpackPlugin;