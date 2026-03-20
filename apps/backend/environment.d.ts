declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_CONNECTION_STRING: string;
			JWT_SECRET: string;
			CACHE_MANAGER: string;
			NODE_ENV: "development" | "production";
		}
	}
}

export {};
