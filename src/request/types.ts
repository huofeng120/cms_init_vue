// 定义返回数据格式
export interface IResonse<T = any> {
	code: number; // 业务状态码
	data: T; // 返回数据
	message: string; // 返回信息
	status?: number; // http状态码
}

export interface HttpRequestOptions {
	baseURL: string;
	timeout: number;
	headers: any;
	authWhiteList?: string[];
}
