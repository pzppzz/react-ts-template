import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import resolvePath from "../utils/resolvePath.js";

export default {
	mode: "development",
	output: {
		path: resolvePath("dist"),
		filename: "js/[name].js",
		chunkFilename: "js/chunk.[name].js",
		assetModuleFilename: "[name].[contenthash:8][ext]",
	},
	devtool: "eval-cheap-source-map",
	devServer: {
		static: {
			directory: resolvePath("public"),
			publicPath: "/",
		},
		port: 3520,
		hot: true,
		liveReload: false,
		compress: true,
		historyApiFallback: true,
		allowedHosts: "auto",
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
			logging: "info",
			progress: true,
			reconnect: 5,
		},
		watchFiles: ["src/**/*", "public/**/*"],
	},
	plugins: [new ReactRefreshPlugin()],
};
