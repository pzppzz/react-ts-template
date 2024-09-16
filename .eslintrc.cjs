module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["react", "react-hooks", "@typescript-eslint"],
	settings: {
		react: {
			version: "detect",
		},
	},
	ignorePatterns: ["dist", "node_modules", "build", "scripts", "webpack", "*.cjs"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				useTabs: true,
				tabWidth: 2,
				semi: true,
				singleQuote: false,
				printWidth: 100,
				endOfLine: "lf",
			},
		],
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: "import", next: "*" },
			{ blankLine: "never", prev: "import", next: "import" },
		],
		"react/react-in-jsx-scope": "off",
		eqeqeq: ["error", "always"],
	},
};
