import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from "src/track/track.module";
import { AlbumController } from "./album.controller";
import { Album, AlbumSchema } from "./album.schema";
import { AlbumService } from "./album.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Album.name, schema: AlbumSchema, collection: "albums" },
		]),
		TrackModule,
	],
	controllers: [AlbumController],
	providers: [AlbumService],
	exports: [AlbumService],
})
export class AlbumModule {}
