import type { TEntityCard, TEntityTypes } from "./common";

export type TLibrary = Array<TLibraryEntity>;

export interface TLibraryEntity {
	readonly _id: string;
	entity: TEntityCard & {
		extra?: {
			album_type?: "single" | "album" | "ep";
			tracks_count?: number;
			is_collection: boolean;
		};
	};
	entity_type: Exclude<TEntityTypes, "user">;
	added_at: string;
	last_played_at: string;
	pinned_at?: string;
}
