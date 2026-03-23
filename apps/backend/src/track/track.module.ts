import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LibraryModule } from "src/library/library.module";
import { TrackController } from "./track.controller";
import { Track, TrackSchema } from "./track.schema";
import { TrackService } from "./track.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Track.name, schema: TrackSchema, collection: "tracks" },
		]),
		forwardRef(() => LibraryModule),
	],
	controllers: [TrackController],
	providers: [TrackService],
	exports: [TrackService],
})
export class TrackModule {}
