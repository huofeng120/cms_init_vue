import { defineStore } from 'pinia';
import { localCache } from '@/utils/cache';
const useHomeStore = defineStore('main', {
	// state: ():自定义类型 => ({}) 例如: state: (): IHomeState => ({})
	state: () => ({
		isCollapse: localCache.get('isCollapse') ?? false
	}),
	getters: {},

	actions: {
		changeCollapseAction(_isCollapse) {
			this.isCollapse = _isCollapse;
			localCache.set('isCollapse', _isCollapse);
		}
	}
});

export default useHomeStore;
