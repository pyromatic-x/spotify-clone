import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from "src/track/track.module";
import { PlaylistController } from "./playlist.controller";
import { Playlist, PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Playlist.name, schema: PlaylistSchema, collection: "playlists" },
		]),
		TrackModule,
	],
	controllers: [PlaylistController],
	providers: [PlaylistService],
	exports: [PlaylistService],
})
export class PlaylistModule {}
