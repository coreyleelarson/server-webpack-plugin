import cluster from 'cluster';

class ServerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const plugin = { name: 'ServerWebpackPlugin' };
    compiler.hooks.afterEmit.tapAsync(plugin, this.afterEmit);
  }

  afterEmit = (compilation, callback) => {
    const { watch = false } = compilation.options;
    const running = this.worker && this.worker.isConnected();

    if (running) {
      if (watch) {
        process.kill(this.worker.process.pid, 'SIGUSR2');
      } else {
        return callback();
      }
    }

    this.startServer(compilation, callback);
  }

  startServer = (compilation, callback) => {
    const names = Object.keys(compilation.assets);
    const { existsAt } = compilation.assets[names[0]];
    
    this.entryPoint = existsAt;

    this._startServer(worker => {
      this.worker = worker;
      callback();
    });
  }

  _startServer = (callback) => {
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