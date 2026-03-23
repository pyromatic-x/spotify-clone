import { ApiProperty } from "@nestjs/swagger";
import type { ObjectId } from "mongoose";

export class AlbumCard {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Trinity", description: "Album name" })
	name: string;

	@ApiProperty({ example: "https://media.sptf...", description: "Picture url" })
	picture_url: string;

	@ApiProperty({
		nullable: true,
		example: "Lorem ipsum...",
		description: "Description of album",
	})
	description: string;

	@ApiProperty({
		example: {
			_id: "67176602423e490c1874022b",
			name: "Noisia",
			picture_url: "https://media.sptf...",
		},
		description: "Album's author",
	})
	author: {
		_id: ObjectId;
		name: string;
		picture_url: string;
	};
}
