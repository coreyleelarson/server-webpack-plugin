# server-webpack-plugin

This plugin is still under development.

### Installation

```bash
npm i --save-dev https://github.com/coreyleelarson/server-webpack-plugin
```

### Basic Usage

**NOTE: This plugin should only be used for develompent purposes.**

Add the server-webpack-plugin to the plugins array in your Webpack file.

```javascript
import ServerPlugin from 'server-webpack-plugin';

export default {
  entry: {
    server: ...,
  },
  ...
  plugins: [
    new ServerPlugin(),
  ],
};
```

### Watch Mode

If you build your Webpack bundle in watch mode, server-webpack-plugin will automatically restart your server after every file change that initiates a new Webpack build. If, for whatever reason, you need to disable server watch mode, set the `{ disableWatch: true }` option.

### Options

```javascript
export default {
  entry: {
    foo: ...,
    bar: ..., // Set entryName option to 'bar'.
  },
  ...
  plugins: [
    new ServerPlugin({
      // Specify entry name
      entryName: 'bar', // default: 'server'
      
      // Disable automatic server restarts
      // while in Webpack watch mode.
      disableWatch: true, // default: false
      
      // Set log level.
      // Options: ['trace', 'debug', 'info', 'warn', 'error', 'silent']
      logLevel: 'silent', // default: 'debug'
    }),
  ],
};
```
