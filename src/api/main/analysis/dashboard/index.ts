import { httpRequest } from '@/request';

export function getAmountListData() {
	return httpRequest.get({
		url: '/goods/amount/list'
	});
}
