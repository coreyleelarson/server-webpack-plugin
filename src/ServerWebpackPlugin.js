import cluster from 'cluster';
import path from 'path';
import Logger from './utils/logger';

class ServerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
    this.logger = new Logger(options.logLevel);
  }

  apply(compiler) {
    const plugin = { name: 'ServerWebpackPlugin' };
    compiler.hooks.done.tapAsync(plugin, this.done);
  }

  done = (stats, callback) => {
    const { compilation } = stats;
    const { disableWatch = false } = this.options;
    const { watch = false } = compilation.options;
    const isRunning = this.worker && this.worker.isConnected();
    const isWatchMode = watch && !disableWatch;

    if (!isRunning) {
      this.logger.debug(isWatchMode ?
        'Starting server in watch mode...' : 'Starting server...');
      return this.startServer(compilation, callback);
    }

    if (isWatchMode) {
      this.logger.debug('Webpack rebuilt...');
      this.logger.debug('Restarting server...');
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
    const { entryName = 'server' } = this.options;
    const map = compilation.entrypoints;
    const entry = map.get ? map.get(entryName) : map[entryName];

    if (!entry) {
      this.logger.error(`Entry ${entryName} does not exist. Try one of: [${Array.from(map.keys()).join(', ')}]`);
      return callback();
    }

    const fileName = entry.chunks[0].files[0];
    const { path: buildPath } = compilation.outputOptions;
    const filePath = path.resolve(buildPath, fileName);

    this.exec(filePath, callback);
  }

  exec = (filePath, callback) => {
    cluster.setupMaster({
      exec: filePath,
    });

    cluster.on('online', worker => {
      this.worker = worker;
      callback();
    });

    cluster.fork();
  }
}

export default ServerWebpackPlugin;