import type { TGetMethods } from "./methods/GET";
import type { TPostMethods } from "./methods/POST";
import type { TPutMethods } from "./methods/PUT";

export type ApiRoutes = {
	GET: TGetMethods;
	POST: TPostMethods;
	PUT: TPutMethods;
};

export type THttpMethods = keyof ApiRoutes;

export type ExtractPath<TMethod extends THttpMethods> =
	TMethod extends keyof ApiRoutes ? keyof ApiRoutes[TMethod] & string : never;

export type ExtractOptions<
	TMethod extends THttpMethods,
	TPath extends ExtractPath<TMethod>,
> = TPath extends keyof ApiRoutes[TMethod]
	? Omit<ApiRoutes[TMethod][TPath], "response">
	: never;

export type ExtractResponse<
	TMethod extends THttpMethods,
	TPath extends ExtractPath<TMethod>,
> = TPath extends keyof ApiRoutes[TMethod]
	? ApiRoutes[TMethod][TPath] extends { response: infer R }
		? R
		: never
	: never;

export type ApiEndpoint = {
	response: unknown;
	body?: unknown;
	pathParams?: Record<string, string>;
	searchParams?: Record<string, string | number | boolean | string[]>;
};
