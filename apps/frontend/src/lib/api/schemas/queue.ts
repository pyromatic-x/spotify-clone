import type { TEntityTypes } from "./common";
import type { TTrack } from "./track";

export interface TQueue {
	track_id?: string;
	source?: {
		_id: string;
		entity: "artist" | "playlist" | "album";
		name: string;
	};
	tracks: Array<TTrack>;
}

export interface TChangeQueuePayload {
	_id: string;
	entity: Exclude<TEntityTypes, "user">;
	track_id?: string;
}
