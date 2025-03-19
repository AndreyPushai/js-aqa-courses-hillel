import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jestConfig from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: { 
        globals: globals.node,
        ecmaVersion: 'latest',
        sourceType: 'module'
    }},
    pluginJs.configs.recommended,
    jestConfig.configs['flat/recommended'],
    ...tseslint.configs.recommended,
    {rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        }
    },
    {ignores: ["dist/"]}
];
