import { ApiProperty } from "@nestjs/swagger";
import type { AlbumCard } from "src/album/dto/album-card.dto";
import type { PlaylistCard } from "src/playlist/dto/playlist-card.dto";
import type { TrackDto } from "src/track/dto/track.dto";
import type { ArtistCard } from "./artist-card.dto";

export class ArtistPage {
	@ApiProperty({
		example: "67176602423e490c1874022b",
	})
	_id: string;

	@ApiProperty({ example: "Pyromatic", description: "User name" })
	name: string;

	@ApiProperty({ example: "https://media.sptf..." })
	picture_url: string;

	@ApiProperty({
		example: "https://media.sptf...",
	})
	backdrop_url: string;

	@ApiProperty({
		example: "#4e4e4e",
	})
	page_accent: string;

	@ApiProperty({
		example: true,
	})
	verified: boolean;

	@ApiProperty({})
	about: {
		text: string;
		picture_url: string;
		author: string;
	};

	@ApiProperty()
	listeners: {
		monthly: string;
		world: Array<{ city: string; value: string }>;
	};

	@ApiProperty()
	links: Array<{ platform: string; username: string }>;

	@ApiProperty()
	in_library: boolean;

	@ApiProperty()
	popular_tracks: Array<TrackDto>;

	@ApiProperty()
	albums: Array<AlbumCard>;

	@ApiProperty()
	similar_artists: Array<ArtistCard>;

	@ApiProperty()
	liked_tracks_count: number;

	@ApiProperty()
	discovered_on_playlists: Array<PlaylistCard>;
}
