import cluster from 'cluster';
import path from 'path';
import Logger from './utils/logger';

const isMultiStats = stats => Boolean(stats.stats);

class ServerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
    this.logger = new Logger(options.logLevel);
  }

  apply(compiler) {
    const plugin = { name: 'ServerWebpackPlugin' };

    cluster.on('online', worker => {
      this.worker = worker;
    });
    
    compiler.hooks.done.tap(plugin, stats => {
      try {
        this.init(stats);
      } catch (error) {
        this.logger.error(error.stack);
      }
    });
  }

  init = (stats) => {
    if (stats.hasErrors()) return;

    if (isMultiStats(stats)) {
      stats.stats.forEach(obj => {
        const { compilation } = obj;
        this.getFilePath(compilation);
      });
    } else {
      const { compilation } = stats;
      this.getFilePath(compilation);
    }

    this.done();
  }

  getFilePath = compilation => {
    const { entryName = 'server' } = this.options;
    const map = compilation.entrypoints;
    const entry = map.get ? map.get(entryName) : map[entryName];

    if (!entry) {
      return;
    }

    const fileName = entry.chunks[0].files[0];
    const outputPath = compilation.outputOptions.path;

    this.filePath = path.resolve(outputPath, fileName);
  }

  done = () => {
    const { disableWatch = false } = this.options;
    const isRunning = this.worker && this.worker.isConnected();

    if (!isRunning) return this.startServer();
    if (!disableWatch) return this.restartServer();
  }

  restartServer = () => {
    this.stopServer();
    this.startServer();
  }

  stopServer = () => {
    this.logger.info('Stopping server...');
    process.kill(this.worker.process.pid, 'SIGUSR2');
  }

  startServer = () => {
    this.logger.info('Starting server...');

    cluster.setupMaster({
      exec: this.filePath,
    });

    cluster.fork();
  }
}

export default ServerWebpackPlugin;