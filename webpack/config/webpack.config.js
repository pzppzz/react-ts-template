import { merge } from "webpack-merge";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import resolvePath from "../utils/resolvePath.js";
import DEVELOPMENT_CONFIG from "./webpack.dev.js";
import PRODUCTION_CONFIG from "./webpack.prod.js";

const isDev = process.env.NODE_ENV === "development";

const BASE_CONFIG = {
	entry: resolvePath("src/index.tsx"),
	output: {
		path: resolvePath("dist"),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				include: resolvePath("src"),
				use: [
					{
						loader: "swc-loader",
						// https://swc.rs/docs/configuring-swc
						options: {
							jsc: {
								preserveAllComments: true,
								parser: {
									syntax: "typescript",
									dynamicImport: true,
									topLevelAwait: false,
									tsx: true,
								},
								target: "es2020",
								externalHelpers: false,
								transform: {
									react: {
										runtime: "automatic",
										refresh: isDev && {
											refreshReg: "$RefreshReg$",
											refreshSig: "$RefreshSig$",
											emitFullSignatures: true,
										},
									},
									useDefineForClassFields: false,
								},
							},
							sourceMaps: true,
							inlineSourcesContent: true,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
				],
			},
			{
				test: /(\.module)?.less$/i,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2, // css文件中@import的文件需要往前经过的loader数量
							esModule: true, // 默认为package.json中的"type"属性，如果为"module"则为true，否则为false
							modules: {
								auto: true,
								localIdentName: isDev ? "[path][local]__[hash:base64:6]" : "[hash:base64:6]",
								exportGlobals: true,
								/**
								 * 当 namedExport 是 true 时，不允许在CSS中使用 default 类, 默认为esModule值
								 * (因为ECMA模块对于默认导出有一个保留关键字 default)，它将自动重命名为 _default 类。
								 * 如果设置为true，你不能import styles from "./index.less" 只能import * as styles from "./index.less"
								 */
								namedExport: false,
							},
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
					{
						loader: "less-loader",
						options: {
							lessOptions: {},
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg|webp|mp4)$/,
				type: "asset/resource",
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				type: "asset/resource",
			},
		],
	},
	optimization: {
		removeEmptyChunks: true,
		providedExports: true,
		usedExports: true,
		splitChunks: {
			chunks: "all",
			minChunks: 1,
			minSize: 20000,
			cacheGroups: isDev
				? {
						default: {
							minChunks: 2,
							priority: -20,
							reuseExistingChunk: true,
						},
					}
				: {
						react: {
							test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
							name: "react",
							priority: 20,
						},
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name: "vendor",
							priority: 10,
						},
					},
		},
	},
	resolve: {
		alias: {
			"@": resolvePath("src"),
		},
		modules: [resolvePath("src"), "node_modules"],
		extensions: [".wasm", ".ts", ".jsx", ".tsx", ".mjs", ".cjs", ".js", ".json"],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: resolvePath("public/index.html"),
		}),
		new MiniCssExtractPlugin(),
	],
};

export default function (env) {
	const config = isDev ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG;
	return merge(BASE_CONFIG, config);
}
