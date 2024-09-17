import resolvePath from "../utils/resolvePath.js";
import TerserWebpackPlugin from "terser-webpack-plugin";
export default {
	mode: "production",
	entry: resolvePath("src/index.tsx"),
	output: {
		filename: "js/[name].[contenthash:8].js",
		chunkFilename: "js/chunk.[id].[chunkhash:8].js",
		assetModuleFilename: "assets/[name].[contenthash:8][ext][query]",
		clean: true,
	},
	devtool: "hidden-source-map",
	optimization: {
		minimizer: [
			new TerserWebpackPlugin({
				minify: TerserWebpackPlugin.swcMinify,
				parallel: true,
				extractComments: true,
				terserOptions: {
					ecma: 2020,
					compress: {
						unused: true,
					},
					mangle: true,
				},
			}),
		],
	},
	plugins: [],
};
