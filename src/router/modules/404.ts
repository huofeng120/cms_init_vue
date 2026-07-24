export default {
	path: '/:pathMatch(.*)*',
	name: 'NotFound',
	component: () => import(/* webpackChunkName: "notFound" */ '@/views/404/404.vue'),
	meta: {
		title: '404',
		hidden: true
	}
};
