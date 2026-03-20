import { CACHE_MANAGER, type Cache } from "@nestjs/cache-manager";
import {
	BadRequestException,
	Controller,
	Get,
	Inject,
	Param,
	Query,
} from "@nestjs/common";
import { DEFAULT_CACHE_TTL } from "src/interceptors/user-cache.interceptor";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id.pipe";
import { CurrentUser } from "src/user/decorators/user.decorator";
import { SearchService } from "./search.service";

@Controller()
export class SearchController {
	constructor(
		private readonly service: SearchService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@Get("/genres")
	async getAllGenres(@CurrentUser() _user: CurrentUser) {
		const cacheKey = "genres";
		const cached = await this.cacheManager.get(cacheKey);
		if (cached) return cached;

		const result = await this.service.getGenres();
		this.cacheManager.set(cacheKey, result, DEFAULT_CACHE_TTL);
		return result;
	}

	@Get("/genres/:id")
	async getGenrePage(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		const cacheKey = `genres/${id}`;
		const cached = await this.cacheManager.get(cacheKey);
		if (cached) return cached;

		const result = await this.service.getGenrePage({ id, user });
		this.cacheManager.set(cacheKey, result, DEFAULT_CACHE_TTL);
		return result;
	}

	@Get("/search")
	search(@Query("query") query: string, @CurrentUser() user: CurrentUser) {
		if (!query || typeof query !== "string") {
			throw new BadRequestException("Query parameter is required");
		}
		return this.service.search({ query, user });
	}
}
