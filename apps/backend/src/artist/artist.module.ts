import { forwardRef, Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { AlbumModule } from "src/album/album.module";
import { PlaylistModule } from "src/playlist/playlist.module";
import { TrackModule } from "src/track/track.module";
import { ArtistController } from "./artist.controller";
import { Artist, ArtistSchema } from "./artist.schema";
import { ArtistService } from "./artist.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Artist.name, schema: ArtistSchema, collection: "artists" },
		]),
		forwardRef(() => TrackModule),
		forwardRef(() => AlbumModule),
		forwardRef(() => PlaylistModule),
	],
	controllers: [ArtistController],
	providers: [ArtistService],
	exports: [ArtistService],
})
export class ArtistModule {}
