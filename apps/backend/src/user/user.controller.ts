/** biome-ignore-all lint/style/useImportType: runtime import */

import { Body, Controller, Get, HttpStatus, Param, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ParseObjectIdPipe } from "src/pipes/parse-object-id.pipe";
import { CurrentUser } from "./decorators/user.decorator";
import type { ChangeQueueDto } from "./dto/change-queue.dto";
import type { UpdateSettingsDto } from "./dto/update-settings.dto";
import { UserPage } from "./dto/user-page.dto";
import { UserQueue } from "./dto/user-queue.dto";
import { UserService } from "./user.service";

@Controller()
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get("/user")
	getUser(@CurrentUser() user: CurrentUser) {
		return this.service.getUser(user._id);
	}

	@Get("/user/:id")
	@ApiOperation({ summary: "Get user page data" })
	@ApiParam({
		name: "id",
		required: true,
		description: "MongoDB _id of a user",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: UserPage,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	getUserPage(
		@Param("id", ParseObjectIdPipe) id: string,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.getUserPage({ id, user });
	}

	@Get("/queue")
	@ApiOperation({ summary: "Get user queue tracks" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Success",
		type: UserQueue,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
	getUserQueue(@CurrentUser() user: CurrentUser) {
		return this.service.getUserQueueTracks({ user });
	}

	@Put("/queue")
	changeQueue(@Body() body: ChangeQueueDto, @CurrentUser() user: CurrentUser) {
		return this.service.changeQueue({
			_id: body._id,
			entity: body.entity,
			user_id: user._id,
			track_id: body.track_id,
		});
	}

	@Get("/settings")
	getSettings(@CurrentUser() user: CurrentUser) {
		return this.service.getSettings({ user });
	}

	@Put("/settings")
	updateSettings(
		@Body() payload: UpdateSettingsDto,
		@CurrentUser() user: CurrentUser,
	) {
		return this.service.updateSettings({ payload, user });
	}
}
