import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CurrentUser } from "src/user/decorators/user.decorator";
import type { Personal } from "./dto/personal.dto";
import { PersonalService } from "./personal.service";

export const PERSONAL_CATEGORIES = [
	"made-for-you",
	"new-releases",
	"favorite-artists",
	"top-mixes",
	"best-of-artists",
] as const;

@Controller("")
export class PersonalController {
	constructor(private readonly service: PersonalService) {}

	@Get("/personal")
	@ApiOperation({ summary: "Get personalized content sections" })
	get_personal(@CurrentUser() user: CurrentUser): Promise<Personal[""]> {
		return this.service.get_personal({ user });
	}

	@Get("/personal/:category")
	@ApiOperation({ summary: "Get personal content by category" })
	get_category(
		@Param("category") category: (typeof PERSONAL_CATEGORIES)[number],
		@CurrentUser() user: CurrentUser,
	) {
		if (!PERSONAL_CATEGORIES.includes(category)) {
			throw new NotFoundException();
		}

		return this.service.get_category({ category, user });
	}
}
