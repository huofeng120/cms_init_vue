// commitlint.config.cjs
export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 自定义规则（可选），覆盖默认配置
		'type-enum': [
			2, // 错误级别：2=错误，1=警告，0=关闭
			'always',
			[
				'feat', // 新功能
				'fix', // 修复 Bug
				'docs', // 文档变更
				'style', // 代码格式（不影响代码运行）
				'refactor', // 重构（既不是新增功能，也不是修复 Bug）
				'perf', // 性能优化
				'test', // 增加测试
				'build', // 构建系统或外部依赖变更（如 webpack、vite 配置）
				'ci', // CI 配置或脚本变更
				'chore', // 其他不修改 src 或 test 的变更
				'revert' // 回滚
			]
		],
		'footer-leading-blank': [2, 'always'], // 关闭 footer 前置空格校验（默认 footer 前置空格）
		'subject-case': [0], // 关闭 subject 大小写校验（默认 subject 不能大写）
		'header-max-length': [2, 'always', 100] // 限制 header 长度不超过 100
	}
};
