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
	}

];
