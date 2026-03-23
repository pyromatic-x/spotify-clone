/** biome-ignore-all lint/style/useImportType: runtime import */

import {
	forwardRef,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserService } from "src/user/user.service";
import type { AuthPayload, AuthResponse } from "./auth.dto";

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private users: UserService,
		@Inject(forwardRef(() => JwtService))
		private jwt: JwtService,
		private configService: ConfigService,
	) {}

	async getSafeUser({ name, password }: AuthPayload): Promise<string> {
		const user = await this.users
			.findOne({ name }, { withPassword: true })
			.catch(() => null);

		if (!user?.password) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return String(user._id);
	}

	async verify(token: string) {
		return (await this.jwt.verifyAsync(token, {
			secret: this.configService.getOrThrow<string>("JWT_SECRET"),
		})) as AuthResponse;
	}
}
