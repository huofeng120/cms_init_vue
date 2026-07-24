export default {
	path: '/login',
	name: 'Login',
	component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
	meta: {
		title: '登录',
		icon: 'login',
		hidden: true
	}
};
