import { ApiProperty } from "@nestjs/swagger";
import type { ObjectId } from "mongoose";

export class UserPlayback {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	active_track_id: ObjectId | null;

	@ApiProperty({
		example: 431,
	})
	time: number;

	@ApiProperty({
		example: 100,
	})
	volume: number;

	@ApiProperty({
		example: "off",
	})
	shuffle: "off" | "on";

	@ApiProperty({
		example: "on",
	})
	repeat: "off" | "on" | "track";

	@ApiProperty({
		example: "playing",
	})
	status: "playing" | "paused";

	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	device: ObjectId;
}
