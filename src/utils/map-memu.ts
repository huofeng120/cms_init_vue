import { type RouteRecordRaw } from 'vue-router';

/**
 * 加载本地路由配置文件，并返回一个包含所有路由的数组
 * @returns 路由配置数组
 */
function loadLocalRoute() {
	const localRoutes: RouteRecordRaw[] = [];
	const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
		eager: true
	});

	for (const key in files) {
		const module = files[key];
		localRoutes.push(module.default);
	}
	return localRoutes;
}

// 设置第一次访问的路由路径，用于重定向到登录后的第一个页面
export let firstPath: string = '';

/**
 * 根据后台返回的菜单列表，生成路由配置
 * @param userMenus 后台返回的菜单列表
 * @returns 路由配置数组
 */
export function mapMenusToRoutes(userMenus: any[]) {
	const localRoutes = loadLocalRoute();
	const routes: RouteRecordRaw[] = [];
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			const route = localRoutes.find((item) => item.path === submenu.url);
			if (route) {
				// 添加重定向路由，只添加一次
				if (!routes.find((item) => item.path === menu.url)) {
					routes.push({ path: menu.url, redirect: route.path });
				}
				routes.push(route);
			}
		}
	}
	// 设置第一次访问的路由路径，用于重定向到登录后的第一个页面
	firstPath = routes[0].path;
	return routes;
}

/**
 * 根据当前路由路径，找到对应的菜单ID
 * @param userMenus 后台返回的菜单列表
 * @param path 当前路由的路径
 * @returns 菜单ID
 */
export function mapRouteToMenuId(userMenus: any[], path: string) {
	let activeId = '';
	for (const menu of userMenus) {
		const menuObject = menu.children.find((item) => item.url === path);
		if (menuObject) {
			activeId = menuObject.id + '';
		}
	}
	return activeId;
}

interface ICrumb {
	path: string;
	name: string;
}
/**
 * 根据当前路由路径，找到对应的面包屑列表
 * @param path 当前路由路径
 * @param userMenus 后台返回的菜单列表
 * @returns 面包屑列表
 */
export function mapMenuToCrumb(path: string, userMenus: any[]) {
	const crumbList: ICrumb[] = [];
	for (const menu of userMenus) {
		for (const children of menu.children) {
			if (children.url === path) {
				// 添加父级面包屑
				crumbList.push({ path: menu.url, name: menu.name });
				// 添加当前面包屑
				crumbList.push({ path: children.url, name: children.name });
			}
		}
	}
	return crumbList;
}
