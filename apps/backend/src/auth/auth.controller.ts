/** biome-ignore-all lint/style/useImportType: runtime import */

import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { CookieOptions, Request, Response } from "express";
import { AuthPayload } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/metadata.decorator";

@Controller("auth")
export class AuthController {
	constructor(
		private service: AuthService,
		private jwt: JwtService,
		private configService: ConfigService,
	) {}

	private getCookieOptions(): CookieOptions {
		const isProduction =
			this.configService.get<string>("NODE_ENV") === "production";
		return {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
			priority: "high",
		};
	}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post("login")
	async login(
		@Body() { name, password }: AuthPayload,
		@Res({ passthrough: true }) response: Response,
	): Promise<boolean> {
		const _id = await this.service.getSafeUser({ name, password });
		const token = await this.jwt.signAsync({ _id, name });

		response.cookie("access_token", token, this.getCookieOptions());

		return true;
	}

	@HttpCode(HttpStatus.OK)
	@Get("verify")
	async verify(@Req() request: Request): Promise<boolean> {
		try {
			const token = request.cookies?.access_token;
			if (!token) return false;

			await this.jwt.verifyAsync(token);
			return true;
		} catch {
			return false;
		}
	}

	@HttpCode(HttpStatus.OK)
	@Post("logout")
	async logout(
		@Res({ passthrough: true }) response: Response,
	): Promise<boolean> {
		response.clearCookie("access_token", this.getCookieOptions());

		return true;
	}
}
