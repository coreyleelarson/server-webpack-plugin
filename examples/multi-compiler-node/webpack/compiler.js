import webpack from 'webpack';
import clientConfig from './config/webpack.config.client.babel';
import serverConfig from './config/webpack.config.server.babel';
import ServerPlugin from '../../../index';

const compiler = webpack([clientConfig, serverConfig]);

new ServerPlugin().apply(compiler);

export default compiler;