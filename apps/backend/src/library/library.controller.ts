/** biome-ignore-all lint/style/useImportType: runtime import */

import { Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id.pipe";
import { CurrentUser } from "src/user/decorators/user.decorator";
import { toObjectId } from "src/utils";
import { LibraryEntity } from "./dto/library.dto";
import { LibraryService } from "./library.service";

@Controller("")
export class LibraryController {
	constructor(private readonly service: LibraryService) {}

	@Get("/library")
	@ApiOperation({ summary: "Get array of user library entities" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: [LibraryEntity],
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	get(@CurrentUser() user: CurrentUser) {
		return this.service.getMany({ query: { user_id: toObjectId(user._id) } });
	}

	@Get("/is-following/:type/:id")
	@ApiOperation({ summary: "Is used added specific entity to library" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: Boolean,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	async isFollowing(
		@Param("type") type: LibraryEntity["entity_type"],
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return {
			following: await this.service.isFollowing({
				target_id: toObjectId(id),
				type,
				user_id: user._id,
			}),
		};
	}

	@Post("/follow/:type/:id")
	toggleFollow(
		@Param("type") type: LibraryEntity["entity_type"],
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.toggleFollow({
			target_id: toObjectId(id),
			type,
			user_id: user._id,
		});
	}
}
