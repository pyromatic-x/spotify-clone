import { IsIn, IsMongoId, IsOptional, IsString } from "class-validator";

export class ChangeQueueDto {
	@IsMongoId()
	_id: string;

	@IsString()
	@IsIn(["artist", "playlist", "album"])
	entity: "artist" | "playlist" | "album";

	@IsOptional()
	@IsMongoId()
	track_id?: string;
}
