export default {
	path: '/main',
	name: 'main',
	component: () => import(/* webpackChunkName: "home" */ '@/views/main/Main.vue'),
	meta: {
		title: '首页',
		icon: 'main',
		keepAlive: true
	}
};
