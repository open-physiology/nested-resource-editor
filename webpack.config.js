var webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	context: __dirname + '/src',
	entry: {
		'{{project-name}}': [ 'babel-polyfill', './index.js' ],
		'{{project-name}}-minimal':           [ './index.js' ]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		library: '{{library-name}}',
		libraryTarget: 'umd',
		sourceMapFilename: '[file].map',
		/* source-map support for IntelliJ/WebStorm */
		devtoolModuleFilenameTemplate:         '[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};
