import { ApiProperty } from "@nestjs/swagger";

export class UserPage {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Pyromatic", description: "User name" })
	name: string;

	@ApiProperty({ example: "https://media.sptf...", description: "Avatar" })
	picture_url: string;

	@ApiProperty({
		example: 12,
		description: "Count of total user followings",
	})
	following_count: number;

	@ApiProperty({
		example: 42,
		description: "Count of total user followers",
	})
	followers_count: number;

	@ApiProperty({
		example: [{}],
		description: "Array of user following",
	})
	following: Array<object>;

	@ApiProperty({
		example: [{}],
		description: "Array of user followers",
	})
	followers: Array<object>;

	@ApiProperty({
		example: [{}],
		description: "Array of user recent listened artists",
	})
	recent_artists: Array<object>;

	@ApiProperty({ example: [{}], description: "Array of user public playlists" })
	playlists: Array<object>;

	@ApiProperty({
		example: [{}],
		description: "Avatar",
		nullable: true,
		required: false,
	})
	top_tracks?: Array<object>;
}
