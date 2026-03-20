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
// biome-ignore lint/style/useImportType: runtime import
import { ArtistService } from "./artist.service";
import { ArtistPage } from "./dto/artist-page.dto";

@Controller()
@UseInterceptors(UserCacheInterceptor)
export class ArtistController {
	constructor(private readonly service: ArtistService) {}

	@Get("/artist/:id")
	@CacheKeyPrefix("artist-page")
	@ApiOperation({ summary: "Get artist page data" })
	@ApiParam({
		name: "id",
		required: true,
		description: "MongoDB _id of an artist",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: ArtistPage,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	getArtistPage(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.getArtistPage({ id, user });
	}

	@Get("/artist/:id/liked-tracks")
	getArtistLikedTracksPage(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.getArtistLikedTracks({ id, user });
	}
}
