import chalk from 'chalk';
import loglevel from 'loglevel';

const log = ({ color, level, message }) => {
  level(chalk.bold('[ServerWebpackPlugin] >'), color(...message))
};

class Logger {
  constructor(level = '') {
    loglevel.setLevel(loglevel.levels[level.toUpperCase()] || loglevel.levels.DEBUG);
  }

  trace(...message) {
    log({ level: loglevel.trace, color: chalk.white, message });
  }

  debug(...message) {
    log({ level: loglevel.debug, color: chalk.cyan, message });
  }

  info(...message) {
    log({ level: loglevel.info, color: chalk.green, message });
  }

  warn(...message) {
    log({ level: loglevel.warn, color: chalk.yellow, message });
  }

  error(...message) {
    log({ level: loglevel.error, color: chalk.red, message });
  }
}

export default Logger;