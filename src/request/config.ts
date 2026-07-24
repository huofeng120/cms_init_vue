let baseURL = 'http://localhost:3000';
const headers = {
	'Content-Type': 'application/json'
};
const timeout = 3000;

const env = import.meta.env.MODE;
console.log(env);
console.log('env::', env);
if (env === 'prod') {
	baseURL = import.meta.env.VITE_API_BASE_URL;
} else if (env === 'dev') {
	baseURL = import.meta.env.VITE_API_BASE_URL;
} else if (env === 'test') {
	baseURL = import.meta.env.VITE_API_BASE_URL;
} else if (env === 'mock') {
	baseURL = import.meta.env.VITE_APP_MOCK_BASEURL;
} else {
	baseURL = import.meta.env.VITE_API_BASE_URL;
}

const authWhiteList = ['/login', '/register'];
export { baseURL, headers, timeout, authWhiteList };
