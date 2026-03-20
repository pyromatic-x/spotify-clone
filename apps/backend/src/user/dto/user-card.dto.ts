import { ApiProperty } from "@nestjs/swagger";

export class UserCard {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Pyromatic", description: "User name" })
	name: string;

	@ApiProperty({ example: "https://media.sptf...", description: "Avatar" })
	picture_url: string;

	@ApiProperty({
		example: "user",
		description: "Count of total user followings",
	})
	entity: "user";
}
