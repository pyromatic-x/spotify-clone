import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AlbumModule } from "src/album/album.module";
import { ArtistModule } from "src/artist/artist.module";
import { AuthModule } from "src/auth/auth.module";
import { PlaylistModule } from "src/playlist/playlist.module";
import { TrackModule } from "src/track/track.module";
import { LibraryModule } from "../library/library.module";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema, collection: "users" },
		]),
		forwardRef(() => LibraryModule),
		forwardRef(() => TrackModule),
		forwardRef(() => ArtistModule),
		forwardRef(() => PlaylistModule),
		forwardRef(() => AlbumModule),
		forwardRef(() => AuthModule),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
