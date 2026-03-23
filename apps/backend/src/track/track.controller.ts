/** biome-ignore-all lint/style/useImportType: runtime import */

import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id.pipe";
import { CurrentUser } from "src/user/decorators/user.decorator";
import { TrackService } from "./track.service";

@Controller()
export class TrackController {
	constructor(private readonly service: TrackService) {}

	@Get("/track/:id/now-playing")
	@ApiOperation({ summary: "Get now playing track data" })
	@ApiParam({ name: "id", description: "MongoDB _id of a track" })
	getNowPlaying(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.getNowPlaying({ id, user });
	}
}
