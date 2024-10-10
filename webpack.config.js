const path = require('path');

const config = () => {

	return {
		entry: './src/index.tsx',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'main.js'
		},
		devServer: {
			static: path.resolve(__dirname, 'build'),
			compress: true,
			port: 3000,
			historyApiFallback: true,
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				}
			]
		},
		resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx']
        }
	}
}

module.exports = config;