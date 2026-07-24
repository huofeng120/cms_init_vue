import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { localCache } from '@/utils/cache';
import { firstPath } from '@/utils/map-memu';
const routes: Array<RouteRecordRaw> = [];

// 动态加载路由模块,需要在modules文件夹下新建文件即可
const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
	eager: true
});
Object.keys(modules).forEach((key: string) => {
	const module = modules[key].default;
	routes.push(module);
});

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	Nprogress.start();
	const token = localCache.get('token');

	if (to.path !== '/login' && !token) {
		next({ path: '/login' });
	} else {
		if (to.path === '/main') {
			next({ path: firstPath });
		}
		next();
	}
});

router.afterEach(() => {
	Nprogress.done();
});

export default router;
