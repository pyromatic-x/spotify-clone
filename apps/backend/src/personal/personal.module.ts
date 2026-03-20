import { Module } from "@nestjs/common";
import { AlbumModule } from "src/album/album.module";
import { ArtistModule } from "src/artist/artist.module";
import { PlaylistModule } from "src/playlist/playlist.module";
import { PersonalController } from "./personal.controller";
import { PersonalService } from "./personal.service";

@Module({
	imports: [AlbumModule, PlaylistModule, ArtistModule],
	controllers: [PersonalController],
	providers: [PersonalService],
})
export class PersonalModule {}
