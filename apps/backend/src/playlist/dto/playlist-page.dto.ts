import { ApiProperty } from "@nestjs/swagger";
import type { ObjectId } from "mongoose";
import type { TrackDto } from "src/track/dto/track.dto";

export class PlaylistPage {
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
		example: "https://media.sptf...",
		description: "Backdrop picture url",
	})
	backdrop_url: string;

	@ApiProperty({
		example: {
			_id: "67176602423e490c1874022b",
			name: "Noisia",
			picture_url: "https://media.sptf...",
		},
		description: "Public or Private playlist",
	})
	author: {
		_id: ObjectId;
		name: string;
		picture_url: string;
	};

	@ApiProperty({
		nullable: true,
		example: "Lorem ipsum...",
		description: "Description of playlist",
	})
	description: string;

	@ApiProperty({
		example: "public",
		description: "Public or Private playlist",
	})
	privacy: string;

	@ApiProperty({
		example: false,
		description: "Is playlist made for requested user",
	})
	is_personal: boolean;

	@ApiProperty({
		description: "Array of tracks",
	})
	tracks: Array<TrackDto & { added_at: Date }>;

	@ApiProperty({
		example: 123,
	})
	tracks_count: number;

	@ApiProperty({
		example: true,
		description: "Is playlist added to library",
	})
	in_library: boolean;

	@ApiProperty({
		example: 42,
		description: "How many people added to library",
	})
	followers_count: number;

	@ApiProperty({
		example: 1244,
		description: "Sum of all tracks duration",
	})
	total_duration: number;

	@ApiProperty({
		description: "Array of recommended tracks",
	})
	recommended_tracks: Array<TrackDto>;
}
