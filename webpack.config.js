const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	devServer: {
		port: 4000,
		historyApiFallback: true,
	},
	entry: {
		home: './pages/home/index.js',
		tech: './pages/tech/index.js',
		about: './pages/about/index.js',
		green: './pages/green/index.js',
		application: './pages/application/index.js',
		news: './pages/news/index.js',
		jobs: './pages/jobs/index.js',
		contact: './pages/contact/index.js',
	},
	output: {
		path: path.join(__dirname, '/build'),
		filename: '[name].min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
}
