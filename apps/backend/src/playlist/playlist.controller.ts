/** biome-ignore-all lint/style/useImportType: runtime import */

import {
	Controller,
	Get,
	HttpStatus,
	Param,
	UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import {
	CacheKeyPrefix,
	UserCacheInterceptor,
} from "src/interceptors/user-cache.interceptor";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id.pipe";
import { CurrentUser } from "src/user/decorators/user.decorator";
import { PlaylistPage } from "./dto/playlist-page.dto";
import { PlaylistService } from "./playlist.service";

@Controller()
@UseInterceptors(UserCacheInterceptor)
export class PlaylistController {
	constructor(private readonly service: PlaylistService) {}

	@Get("/playlist/:id")
	@CacheKeyPrefix("playlist-page")
	@ApiOperation({ summary: "Get playlist page data" })
	@ApiParam({
		name: "id",
		required: true,
		description: "MongoDB _id of a playlist",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: PlaylistPage,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	getPlaylistPage(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.getPlaylistPage({ id, user });
	}
}
