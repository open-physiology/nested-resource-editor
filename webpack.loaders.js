module.exports = [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	},
	{
		test: /\.json$/,
		loader: 'json-loader'
	},
	{
		test: /icons[\/\\]\w+\.png$/,
		loader: 'url-loader?limit=20000'
	},
	{
		test: /node_modules[\/\\](utilities|open-physiology-model)[\/\\]src[\/\\].*\.js$/,
		loader: 'babel-loader'
	},
	{
		test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url?limit=10000&mimetype=application/font-woff'
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url?limit=10000&mimetype=application/octet-stream'
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'file'
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url?limit=10000&mimetype=image/svg+xml'
	}

];
