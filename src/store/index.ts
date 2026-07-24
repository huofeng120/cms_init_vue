import { createPinia } from 'pinia';
import type { App } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useLoginStore from './login';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 使用pinia持久化插件

function registryStore(app: App<Element>) {
	app.use(pinia);
	const loginStore = useLoginStore();
	loginStore.loadLocalCacheAction();
}
export default registryStore;
