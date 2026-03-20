import { ApiProperty } from "@nestjs/swagger";

export class LibraryEntity {
	@ApiProperty({
		example: "6876567bfd8a1fd2be6cea7c",
	})
	_id: string;

	@ApiProperty({
		example: [
			{
				_id: "6876567bfd8a1fd2be6cea7c",
				name: "Daily Mix",
				picture_url: "https://media.sptf...",
				author: {
					_id: "6876567bfd8a1fd2be6cea7c",
					name: "Spotify",
				},
			},
		],
		description: "Entity of a library unit",
	})
	entity: {
		_id: string;
		name: string;
		picture_url: string;
		author?: {
			_id: string;
			name: string;
		};
		extra?: {
			album_type?: "single" | "album";
			tracks_count?: number;
		};
	};

	entity_type: "artist" | "playlist" | "album";

	@ApiProperty({ description: "Avatar" })
	added_at: string;

	@ApiProperty({ description: "Avatar" })
	last_added_at: string;

	@ApiProperty({ description: "Avatar" })
	pinned_at?: string;
}
