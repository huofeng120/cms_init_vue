class Cache {
	private storage: any;
	constructor(type: string) {
		this.storage = type === 'local' ? localStorage : sessionStorage;
	}

	set(key: string, value: string) {
		this.storage.setItem(key, JSON.stringify(value));
	}

	get(key: string) {
		const raw = this.storage.getItem(key);
		if (raw === null) return null;
		try {
			return JSON.parse(raw); // 尝试解析为 JSON
		} catch {
			return raw; // 解析失败，返回原始字符串
		}
	}

	clear() {
		this.storage.clear();
	}
	remove(key: string) {
		this.storage.remove(key);
	}
}

export const localCache = new Cache('local');
export const sessionCache = new Cache('session');
