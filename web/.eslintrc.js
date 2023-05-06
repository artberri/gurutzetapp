module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"airbnb",
		"airbnb/hooks",
		"airbnb-typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"prettier",
	],
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
	},
	rules: {
		"no-void": ["error", { allowAsStatement: true }],
		"react/react-in-jsx-scope": ["off"],
		"react/require-default-props": ["off"],
		"react/function-component-definition": [
			"error",
			{
				namedComponents: "arrow-function",
			},
		],
		"import/prefer-default-export": ["off"],
		"import/no-default-export": ["error"],
	},
	overrides: [
		{
			files: ["src/specs/**"],
			rules: {
				"import/no-extraneous-dependencies": [
					"error",
					{ devDependencies: true },
				],
			},
		},
	],
}
