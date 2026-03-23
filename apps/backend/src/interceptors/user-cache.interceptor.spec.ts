import { Reflector } from "@nestjs/core";
import { of } from "rxjs";
import {
	CACHE_KEY_PREFIX,
	CACHE_TTL_KEY,
	DEFAULT_CACHE_TTL,
	UserCacheInterceptor,
} from "./user-cache.interceptor";

describe("UserCacheInterceptor", () => {
	let interceptor: UserCacheInterceptor;
	let cacheManager: Record<string, jest.Mock>;
	let reflector: Record<string, jest.Mock>;

	const createContext = (userId = "user123", paramId = "param456") => ({
		getHandler: jest.fn().mockReturnValue(() => {}),
		getClass: jest.fn(),
		switchToHttp: () => ({
			getRequest: () => ({
				user: userId ? { _id: userId } : undefined,
				params: { id: paramId },
			}),
		}),
	});

	const createNext = (data: unknown = { test: true }) => ({
		handle: () => of(data),
	});

	beforeEach(() => {
		cacheManager = { get: jest.fn(), set: jest.fn() };
		reflector = { get: jest.fn() };

		interceptor = new UserCacheInterceptor(
			cacheManager as any,
			reflector as unknown as Reflector,
		);
	});

	it("should skip caching if no prefix is set", async () => {
		reflector.get.mockReturnValue(undefined);
		const next = createNext();

		const result = await interceptor.intercept(
			createContext() as any,
			next as any,
		);
		const data = await result.toPromise();

		expect(data).toEqual({ test: true });
		expect(cacheManager.get).not.toHaveBeenCalled();
	});

	it("should return cached data if available", async () => {
		const cached = { cached: true };
		reflector.get.mockImplementation((key: string) => {
			if (key === CACHE_KEY_PREFIX) return "test-prefix";
			return undefined;
		});
		cacheManager.get.mockResolvedValue(cached);

		const result = await interceptor.intercept(
			createContext() as any,
			createNext() as any,
		);
		const data = await result.toPromise();

		expect(data).toEqual(cached);
	});

	it("should cache and return data on cache miss", async () => {
		reflector.get.mockImplementation((key: string) => {
			if (key === CACHE_KEY_PREFIX) return "test-prefix";
			return undefined;
		});
		cacheManager.get.mockResolvedValue(undefined);

		const result = await interceptor.intercept(
			createContext() as any,
			createNext({ fresh: true }) as any,
		);
		const data = await result.toPromise();

		expect(data).toEqual({ fresh: true });
		expect(cacheManager.set).toHaveBeenCalledWith(
			"user-user123:test-prefix-param456",
			{ fresh: true },
			DEFAULT_CACHE_TTL,
		);
	});

	it("should use custom TTL if set", async () => {
		reflector.get.mockImplementation((key: string) => {
			if (key === CACHE_KEY_PREFIX) return "test-prefix";
			if (key === CACHE_TTL_KEY) return 5000;
			return undefined;
		});
		cacheManager.get.mockResolvedValue(undefined);

		const result = await interceptor.intercept(
			createContext() as any,
			createNext() as any,
		);
		await result.toPromise();

		expect(cacheManager.set).toHaveBeenCalledWith(
			expect.any(String),
			expect.anything(),
			5000,
		);
	});

	it("should use 'anon' for unauthenticated users", async () => {
		reflector.get.mockImplementation((key: string) => {
			if (key === CACHE_KEY_PREFIX) return "test-prefix";
			return undefined;
		});
		cacheManager.get.mockResolvedValue(undefined);

		const ctx = createContext("", "p1");

		const result = await interceptor.intercept(
			ctx as any,
			createNext() as any,
		);
		await result.toPromise();

		expect(cacheManager.set).toHaveBeenCalledWith(
			"user-anon:test-prefix-p1",
			expect.anything(),
			expect.any(Number),
		);
	});
});
