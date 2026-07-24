import { httpRequest } from '@/request';

export function accountLogin(params: any) {
	return httpRequest.post({
		url: '/login',
		data: params
	});
}

export function getUserInfo(userId: number) {
	return httpRequest.get({
		url: `/users/${userId}`
	});
}

export function getMenuInfo(userId: number) {
	return httpRequest.get({
		url: `/role/${userId}/menu`
	});
}
