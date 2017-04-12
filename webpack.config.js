var webpack           = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var loaders           = require('./webpack.loaders.js');

module.exports = {
	devtool: 'source-map',
	context: __dirname + '/src',
	entry: {
		'test-app/index':   [ 'babel-polyfill', 'zone.js/dist/zone.js', './test-app/index.js' ],
		'project-template': [ 'babel-polyfill', 'zone.js/dist/zone.js', './index.js' ],
		'project-template-minimal':                                   [ './index.js' ]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		// library: 'ProjectName',
		// libraryTarget: 'umd',
		sourceMapFilename: '[file].map',
		/* source-map support for IntelliJ/WebStorm */
		devtoolModuleFilenameTemplate:         '[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new CopyWebpackPlugin([
			{ from: 'test-app/index.html', to: 'test-app/index.html' }
		])
	]
};
