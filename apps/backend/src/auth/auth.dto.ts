import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "src/user/user.schema";

export class AuthPayload {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	password: string;
}

export class AuthResponse extends PickType(User, [
	"_id",
	"name",
	"picture_url",
	"devices",
]) {}
