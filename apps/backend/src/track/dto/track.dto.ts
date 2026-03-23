import type { ObjectId } from "mongoose";
import type { Artist } from "src/artist/artist.schema";
import type { Track } from "../track.schema";

export type TrackDto = {
	added_to_playlists: Array<ObjectId>;
	author: Pick<Artist, "_id" | "name">;
	album: {
		id: ObjectId;
		name: string;
		picture_url: string;
		video_url: string;
	};
} & Track;
