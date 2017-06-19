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
		test: /\.txt$/,
		loader: 'raw-loader'
	},
	{
		test: /\.css$/,
		loader: [ 'style-loader', 'css-loader', 'autoprefixer-loader' ]
	},
	{
		test: /icons[\/\\]\w+\.png$/,
		loader: 'url-loader?limit=20000'
	},
	{
		test: /node_modules[\/\\](utilities|open-physiology-model|open-physiology-manifest)[\/\\]src[\/\\].*\.js$/,
		loader: 'babel-loader'
	},
    {
        test: /^open-physiology-manifest$/,
        loader: 'babel-loader'
    },
    {
		test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url-loader?mimetype=application/font-woff'
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url-loader?mimetype=application/octet-stream'
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'file-loader'
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url-loader?mimetype=image/svg+xml'
	}
];
