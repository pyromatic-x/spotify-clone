import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AlbumModule } from "src/album/album.module";
import { ArtistModule } from "src/artist/artist.module";
import { PlaylistModule } from "src/playlist/playlist.module";
import { TrackModule } from "src/track/track.module";
import { UserModule } from "src/user/user.module";
import { SearchController } from "./search.controller";
import { Genre, GenreSchema } from "./search.schema";
import { SearchService } from "./search.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Genre.name, schema: GenreSchema, collection: "genres" },
		]),
		AlbumModule,
		ArtistModule,
		UserModule,
		PlaylistModule,
		TrackModule,
	],
	controllers: [SearchController],
	providers: [SearchService],
	exports: [SearchService],
})
export class SearchModule {}
