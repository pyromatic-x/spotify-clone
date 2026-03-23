/** biome-ignore-all lint/style/useImportType: runtime import */

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
	type CallHandler,
	type ExecutionContext,
	Inject,
	Injectable,
	type NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Cache } from "cache-manager";
import { type Observable, of, tap } from "rxjs";

export const CACHE_TTL_KEY = "cache_ttl";
export const CACHE_KEY_PREFIX = "cache_key_prefix";

export const DEFAULT_CACHE_TTL = 900_000;

export function CacheTTL(ttl: number): MethodDecorator {
	return (_target, _propertyKey, descriptor) => {
		Reflect.defineMetadata(CACHE_TTL_KEY, ttl, descriptor.value as object);
		return descriptor;
	};
}

export function CacheKeyPrefix(prefix: string): MethodDecorator {
	return (_target, _propertyKey, descriptor) => {
		Reflect.defineMetadata(
			CACHE_KEY_PREFIX,
			prefix,
			descriptor.value as object,
		);
		return descriptor;
	};
}

@Injectable()
export class UserCacheInterceptor implements NestInterceptor {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private reflector: Reflector,
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<unknown>> {
		const handler = context.getHandler();
		const prefix = this.reflector.get<string>(CACHE_KEY_PREFIX, handler);

		if (!prefix) return next.handle();

		const request = context.switchToHttp().getRequest();
		const userId = request.user?._id ?? "anon";
		const paramId = request.params?.id ?? "";

		const cacheKey = `user-${userId}:${prefix}-${paramId}`;
		const cached = await this.cacheManager.get(cacheKey);

		if (cached) return of(cached);

		const ttl =
			this.reflector.get<number>(CACHE_TTL_KEY, handler) ?? DEFAULT_CACHE_TTL;

		return next.handle().pipe(
			tap((data) => {
				this.cacheManager.set(cacheKey, data, ttl);
			}),
		);
	}
}
