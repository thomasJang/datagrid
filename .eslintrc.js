module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:react-hooks/recommended",
  ],
  plugins: ["unused-imports"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    "@typescript-eslint/ban-ts-comment": 1,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/consistent-type-assertions": 2,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/no-non-null-assertion": 2,
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-var-requires": 0,
    "no-else-return": 2,
    "react/prop-types": 0,
    "react/jsx-no-target-blank": 0,
    "unused-imports/no-unused-imports-ts": 2,
    "unused-imports/no-unused-vars-ts": 1,
    "react-hooks/exhaustive-deps": 2,
  },
  settings: {
    react: {
      // version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      pragma: "React",
      version: "17.0",
    },
  },
};
