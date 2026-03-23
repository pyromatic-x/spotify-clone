import type { AlbumCard } from "src/album/dto/album-card.dto";
import type { ArtistCard } from "src/artist/dto/artist-card.dto";
import type { PlaylistCard } from "src/playlist/dto/playlist-card.dto";

export interface Personal {
	"": Array<{
		category: string;
		title?: string;
		subtitle?: string;
		entities: Array<PlaylistCard | ArtistCard | AlbumCard>;
	}>;
}
