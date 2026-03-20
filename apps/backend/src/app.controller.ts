import { Controller, Get, Head, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { Public } from "./auth/decorators/metadata.decorator";

@Controller()
export class AppController {
	@HttpCode(HttpStatus.OK)
	@Public()
	@Head()
	@ApiExcludeEndpoint()
	ping() {}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Get("/")
	@ApiExcludeEndpoint()
	get() {
		return { status: "OK" };
	}
}
