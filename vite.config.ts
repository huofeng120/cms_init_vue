import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import visualizer from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const isAnalyze = mode === 'analyze';
	return {
		base: './', // 设置打包路径
		publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 设置公共文件夹 无需打包

		plugins: [
			isAnalyze &&
				visualizer({
					filename: 'dist/stats.html',
					open: true,
					gzipSize: true,
					brotliSize: true
				}),
			// 配置 Gzip 压缩
			viteCompression({
				algorithm: 'gzip', // 使用 gzip 算法
				ext: '.gz', // 生成文件的后缀名
				threshold: 10240, // 只压缩大于 10KB 的文件（小文件压缩收益低）
				deleteOriginFile: false, // 压缩后不删除原始文件
				verbose: true // 在控制台输出压缩信息
			}),
			// 配置 Brotli 压缩（可选，压缩率比 Gzip 更高）
			viteCompression({
				algorithm: 'brotliCompress',
				ext: '.br',
				threshold: 10240,
				deleteOriginFile: false,
				verbose: true
			}),
			...tailwindcss(),
			eslintPlugin(),
			vue(),
			vueJsx(),
			AutoImport({
				// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				imports: ['vue'],
				resolvers: [
					ElementPlusResolver(),
					IconsResolver() // 自动导入图标组件
				],
				dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
			}),
			Components({
				resolvers: [ElementPlusResolver(), IconsResolver()],
				dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
			}),
			ElementPlus({
				useSource: true // 这行很关键，确保样式按需加载
			}),
			Icons({
				autoInstall: true
			})
		].filter(Boolean), // 过滤掉 undefined 的插件
		server: {
			port: 3000, // 端口号
			open: true, // 自动打开浏览器
			cors: true // 允许跨域
			// proxy: {
			// 	// 代理
			// 	'/api': {
			// 		target: 'http://localhost:3000',
			// 		changeOrigin: true,
			// 		rewrite: (path) => path.replace(/^\/api/, '')
			// 	}
			// }
		},
		build: {
			outDir: fileURLToPath(new URL('./dist', import.meta.url)), // 设置打包输出目录
			assetsDir: 'assets', // 设置静态资源目录
			sourcemap: false, // 生成sourceMap文件
			chunkSizeWarningLimit: 400, // 设置打包文件大小警告阈值
			// 合并碎片文件，减少 HTTP 请求数
			experimentalMinChunkSize: 20 * 1024,
			// 资源指纹策略
			assetsInlineLimit: 4096, // 4kb以下资源转base64
			rollupOptions: {
				input: {
					index: fileURLToPath(new URL('./index.html', import.meta.url))
				},
				output: {
					cleanDir: true, // 清理dist目录
					format: 'esm', // 设置打包格式
					entryFileNames: 'assets/js/[name]-[hash:8].js', // 设置入口文件名
					chunkFileNames: 'assets/js/[name]-[hash:8].js', // 设置chunk文件名
					assetFileNames: 'assets/[ext]/[name]-[hash:8].[ext]', // 设置静态资源文件名

					manualChunks: (id) => {
						// 仅处理 node_modules 下的第三方依赖
						if (id.includes('node_modules')) {
							// ✅ 加上 / 进行精确匹配，避免误伤 vue-i18n, vueuse 等
							if (id.includes('/vue/') || id.includes('/vue-router/') || id.includes('/pinia/')) {
								return 'vue-vendor';
							}
							if (id.includes('/element-plus/')) {
								return 'ui-vendor';
							}
							if (id.includes('/axios/') || id.includes('/lodash-es/') || id.includes('/dayjs/')) {
								return 'utils-vendor';
							}
							// ✅ 兜底：其他所有 node_modules 打包到通用 vendor
							return 'vendor';
						}
						return null; // 其他模块不进行拆分
					}
				}
			}
		},
		optimizeDeps: {
			include: [
				'vue',
				'vue-router',
				'pinia',
				'axios',
				'element-plus/es' // 预构建 element-plus 的核心入口
			]
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	};
});
