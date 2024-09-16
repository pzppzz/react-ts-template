module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
	plugins: ["stylelint-order", "stylelint-prettier"],
	customSyntax: "postcss-less",
	ignoreFiles: ["node_modules/**/*.css", "dist/**/*.css", "build/**/*.css"],
	rules: {
		"prettier/prettier": true,
		"at-rule-empty-line-before": "always", // 规则前有空行
	},
};
