import { defineStore } from 'pinia';
import { accountLogin, getUserInfo, getMenuInfo } from '@/api/login';
import { localCache } from '@/utils/cache';
import { mapMenusToRoutes } from '@/utils/map-memu';
import router from '@/router';

interface IState {
	token: string;
	userInfo: any;
	userMenus: any;
}
const useLoginStore = defineStore('login', {
	state: (): IState => ({
		token: '',
		userInfo: {},
		userMenus: []
	}),

	actions: {
		async actionAccountLogin({ name, password }) {
			const res = await accountLogin({ name, password });
			const userId = res.data.id;
			this.setToken(res.data.token);
			this.userInfo = await this.getUserInfoAction(userId);

			this.userMenus = await this.getMenuInfoAction(this.userInfo.role.id);

			const routes = mapMenusToRoutes(this.userMenus);
			for (const route of routes) {
				router.addRoute('main', route);
			}
			
			router.push('/main');
		},
		setToken(token: string) {
			this.token = token;
			localCache.set('token', token);
		},

		async getUserInfoAction(userId: number) {
			const res = await getUserInfo(userId);
			localCache.set('userInfo', res.data);
			return res.data;
		},
		async getMenuInfoAction(roleId: number) {
			const res = await getMenuInfo(roleId);
			localCache.set('userMenus', res.data);
			return res.data;
		},

		loadLocalCacheAction() {
			const token = localCache.get('token');
			const userInfo = localCache.get('userInfo');
			const userMenus = localCache.get('userMenus');
			if (token && userInfo && userMenus) {
				this.token = token;
				this.userInfo = userInfo;
				this.userMenus = userMenus;

				const routes = mapMenusToRoutes(this.userMenus);
				for (const route of routes) {
					router.addRoute('main', route);
				}
			}
		}
	}
});

export default useLoginStore;
