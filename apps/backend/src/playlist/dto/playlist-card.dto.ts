import { ApiProperty } from "@nestjs/swagger";
import type { ObjectId } from "mongoose";

export class PlaylistCard {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Liked Songs", description: "Playlist name" })
	name: string;

	@ApiProperty({ example: "https://media.sptf...", description: "Picture url" })
	picture_url: string;

	@ApiProperty({
		nullable: true,
		example: "Lorem ipsum...",
		description: "Description of playlist",
	})
	description: string;

	@ApiProperty({
		example: "#ebe36c",
		description: "Accent color of playlist",
	})
	accent: string;

	@ApiProperty({
		example: true,
		description: "Is playlist user's collection (liked songs) or not",
	})
	collection?: true;

	@ApiProperty({
		example: {
			_id: "67176602423e490c1874022b",
			name: "Noisia",
			picture_url: "https://media.sptf...",
		},
		description: "Playlist's author",
	})
	author: {
		_id: ObjectId;
		name: string;
		picture_url: string;
	};
}
