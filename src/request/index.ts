/**
 * 文档说明：
 * 通过axios封装的请求方法
 */
import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';

import { baseURL, timeout, headers, authWhiteList } from './config';
import { getStatusMessage } from './status';
import type { IResonse, HttpRequestOptions } from './types';
import { localCache } from '@/utils/cache';
class HttpRequest {
	// 实例化axios
	private instence: AxiosInstance;
	constructor(config: HttpRequestOptions) {
		// 创建axios实例
		this.instence = axios.create(config);

		// 请求拦截器
		this.instence.interceptors.request.use(
			(req: InternalAxiosRequestConfig) => {
				const url = req.url ?? '';
				const shouldSkip = config.authWhiteList?.some((path) => path.includes(url));
				if (!shouldSkip) {
					const token = localCache.get('token');
					console.log('token:::', token);
					req.headers.Authorization = token;
				}
				return req;
			},
			(err) => {
				return Promise.reject(err);
			}
		);

		// 响应拦截器
		this.instence.interceptors.response.use(
			(res: AxiosResponse) => {
				if (res.status === 200) {
					return res;
				}
				ElMessage.error(getStatusMessage(res.status));
				return res;
			},
			(err: AxiosError) => {
				const { response } = err;
				if (response) {
					ElMessage.error(getStatusMessage(response.status));
					return Promise.reject(response.data);
				}
				ElMessage.error('网络连接错误,请检查网络连接');
			}
		);
	}

	async request<T = any>(config: AxiosRequestConfig): Promise<IResonse<T>> {
		return new Promise((resolve, reject) => {
			this.instence
				.request(config)
				.then((res: AxiosResponse<IResonse<T>>) => {
					const data = res.data;
					if (data.code === 0) {
						resolve(data);
					} else {
						ElMessage.error(data.message);
						reject(data);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	async get<T = any>(config: AxiosRequestConfig): Promise<any> {
		return this.request<T>({
			...config,
			method: 'get'
		});
	}

	async post<T = any>(config: AxiosRequestConfig): Promise<any> {
		return this.request<T>({
			...config,
			method: 'post'
		});
	}

	async patch(config: AxiosRequestConfig): Promise<any> {
		return this.request({
			...config,
			method: 'patch'
		});
	}

	async del<T = any>(config: AxiosRequestConfig): Promise<any> {
		return this.request<T>({
			...config,
			method: 'delete'
		});
	}

	async put<T = any>(config: InternalAxiosRequestConfig): Promise<any> {
		return this.request<T>({
			...config,
			method: 'put'
		});
	}
}

// 导出实例
export const httpRequest = new HttpRequest({
	baseURL,
	timeout,
	headers,
	authWhiteList
});

// 导出类
export default HttpRequest;
