import type { THttpError } from "../schemas/error";
import type {
	ApiEndpoint,
	ExtractOptions,
	ExtractPath,
	ExtractResponse,
	THttpMethods,
} from "./types";

export type GetUserId = () => Promise<string | undefined>;

class TypedHttpClient {
	private readonly baseUrl: string;

	constructor() {
		this.baseUrl = import.meta.env.VITE_BACKEND_URL || "";
		if (!this.baseUrl) {
			throw new Error("API_URL is missing.");
		}
	}

	private isParamsEmpty(params: Record<string, unknown>): boolean {
		return Object.keys(params).length === 0;
	}

	private async buildHeaders(
		options: Omit<ApiEndpoint, "response">,
	): Promise<Record<string, string>> {
		const headers: Record<string, string> = {
			Accept: "application/json",
		};

		if (!(options.body instanceof FormData)) {
			headers["Content-Type"] = "application/json";
		}

		return headers;
	}

	private buildUrl<TOptions extends Omit<ApiEndpoint, "response" | "body">>(
		path: string,
		options: TOptions,
	): string {
		const { searchParams, pathParams } = options;

		let url = path;

		if (pathParams && !this.isParamsEmpty(pathParams)) {
			Object.entries(pathParams).forEach(([key, value]) => {
				url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
			});
		}

		if (searchParams && !this.isParamsEmpty(searchParams)) {
			const search = new URLSearchParams();

			for (const key in searchParams) {
				const value = searchParams[key];
				if (Array.isArray(value)) {
					value.forEach((v) => {
						search.append(key, String(v));
					});
				} else {
					search.append(key, String(value));
				}
			}

			url += `?${search.toString()}`;
		}

		return `${this.baseUrl}${url}`;
	}

	private async request<TPath extends string, TResponse>(
		method: THttpMethods,
		path: TPath,
		options: Omit<ApiEndpoint, "response">,
	): Promise<TResponse | null> {
		const url = this.buildUrl(path, options);
		const headers = await this.buildHeaders(options);

		const config: RequestInit = {
			headers,
			method,
			credentials: "include",
			mode: "cors",
			...(options.body !== undefined && options.body !== null
				? {
						body:
							options.body instanceof FormData
								? options.body
								: JSON.stringify(options.body),
					}
				: {}),
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				const body = (await response
					.json()
					.catch(() => ({}))) as Partial<THttpError>;
				throw {
					...body,
					message: body.message ?? response.statusText,
					statusCode: response.status,
					error: body.error ?? response.statusText,
				} as THttpError;
			}

			const contentType = response.headers.get("content-type");
			if (contentType?.includes("text/html"))
				return response.text() as TResponse;

			return response.json().catch(() => null);
		} catch (error: unknown) {
			console.error(`${method} "${url}" error:`, error);
			throw error;
		}
	}

	get<
		TMethod extends "GET",
		TPath extends ExtractPath<TMethod>,
		TResponse extends ExtractResponse<TMethod, TPath> | null,
	>(
		path: TPath,
		options?: ExtractOptions<TMethod, TPath>,
	): Promise<TResponse | null> {
		return this.request<TPath, TResponse | null>("GET", path, options ?? {});
	}

	post<
		TMethod extends "POST",
		TPath extends ExtractPath<TMethod>,
		TResponse extends ExtractResponse<TMethod, TPath>,
	>(path: TPath, options: ExtractOptions<TMethod, TPath>): Promise<TResponse> {
		return this.request<TPath, TResponse>(
			"POST",
			path,
			options,
		) as Promise<TResponse>;
	}

	put<
		TMethod extends "PUT",
		TPath extends ExtractPath<TMethod>,
		TResponse extends ExtractResponse<TMethod, TPath>,
	>(path: TPath, options: ExtractOptions<TMethod, TPath>): Promise<TResponse> {
		return this.request<TPath, TResponse>(
			"PUT",
			path,
			options,
		) as Promise<TResponse>;
	}
}

export const HTTP = new TypedHttpClient();
