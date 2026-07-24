import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			}
		},
		ignores: [
			'*.sh',
			'node_modules',
			'*.md',
			'*.woff',
			'*.ttf',
			'.vscode',
			'.idea',
			'dist',
			'/public',
			'/docs',
			'.husky',
			'.local',
			'/bin',
			'/src/mock/*',
			'.eslintcache'
		]
	},
	tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
		rules: {}
	},
	// 最后统一覆盖 TypeScript 规则（放在这里才有效）
	{
		files: ['**/*.{ts,tsx,vue}'], // 只针对 TS 文件
		rules: {
			// 关闭 any 检查
			'@typescript-eslint/no-explicit-any': 'off',
			// 关闭组件名必须多单词的规则[reference:25][reference:26]
			'vue/multi-word-component-names': 'off'
		}
	}
]);
