import { ApiProperty } from "@nestjs/swagger";
import type { ObjectId } from "mongoose";
import type { TrackDto } from "src/track/dto/track.dto";

export class UserQueue {
	@ApiProperty({
		nullable: true,
		required: false,
		description: "Источник, например, какой-то альбом",
		example: {
			_id: "672fc78d1e1f470d71a9c361",
			entity: "album",
			name: "All We Needed",
		},
	})
	source: {
		_id: ObjectId;
		entity: "artist" | "playlist" | "album";
		name: string;
	};

	track_id?: string;

	@ApiProperty({ description: "Список треков в очереди" })
	tracks: Array<TrackDto>;
}
