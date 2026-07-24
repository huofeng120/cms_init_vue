export function getStatusMessage(status: number): string {
	switch (status) {
		case 400:
			return '请求参数错误(400)';
		case 401:
			return '未授权(401)';
		case 403:
			return '权限不足(403)';
		case 404:
			return '资源未找到(404)';
		case 500:
			return '服务器内部错误(500)';
		case 502:
			return '网关错误(502)';
		case 503:
			return '服务不可用(503)';
		case 504:
			return '网关超时(504)';
		default:
			return `未知错误${status}`;
	}
}
