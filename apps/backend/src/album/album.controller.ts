import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Query,
	UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import {
	CacheKeyPrefix,
	UserCacheInterceptor,
} from "src/interceptors/user-cache.interceptor";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id.pipe";
import { CurrentUser } from "src/user/decorators/user.decorator";
import type { FeedQueryDto } from "src/user/dto/feed-query.dto";
import { AlbumService } from "./album.service";
import { AlbumPage } from "./dto/album-page.dto";

@Controller()
@UseInterceptors(UserCacheInterceptor)
export class AlbumController {
	constructor(private readonly service: AlbumService) {}

	@Get("/album/:id")
	@CacheKeyPrefix("album-page")
	@ApiOperation({ summary: "Get album page data" })
	@ApiParam({
		name: "id",
		required: true,
		description: "MongoDB _id of an album",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: AlbumPage,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	getAlbumPage(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.getAlbumPage({ id, user });
	}

	@Get("/feed")
	@ApiOperation({ summary: "Get album feed" })
	getFeed(@Query() query: FeedQueryDto) {
		return this.service.getFeed({ page: query.page });
	}
}
