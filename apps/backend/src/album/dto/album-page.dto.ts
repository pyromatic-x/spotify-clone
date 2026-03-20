import { ApiProperty } from "@nestjs/swagger";
import type { ObjectId } from "mongoose";
import type { TrackDto } from "src/track/dto/track.dto";

export class AlbumPage {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Trinity", description: "Album name" })
	name: string;

	@ApiProperty({ example: "https://media.sptf...", description: "Picture url" })
	picture_url: string;

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

	@ApiProperty({
		description: "Array of tracks",
	})
	tracks: Array<TrackDto>;

	accent: string;

	@ApiProperty({
		example: true,
		description: "Is album added to library",
	})
	in_library: boolean;
}
