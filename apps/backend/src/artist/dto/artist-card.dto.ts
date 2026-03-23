import { ApiProperty } from "@nestjs/swagger";

export class ArtistCard {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Noisia", description: "Artist name" })
	name: string;

	@ApiProperty({
		example: "https://media.sptf...",
		description: "Artist avatar",
	})
	picture_url: string;

	@ApiProperty({
		example: "user",
	})
	entity: "artist";
}
