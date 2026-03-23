import type { TLibrary } from "@schemas/library";
import type { TPlaylistCard } from "@schemas/playlist";
import { create } from "zustand";
import type { TUser } from "@/lib/api/schemas/user";

export interface TLibraryStore {
	initialEntities: TLibrary;
	entities: TLibrary;
	search: string;
	category:
		| TLibrary["0"]["entity_type"]
		| "playlist-by-user"
		| "playlist-by-spotify"
		| "";
	sort: "recents" | "recently-added" | "alphabetical" | "creator";
	view: "compact-list" | "default-list" | "compact-grid" | "default-grid";
	size: "DEFAULT" | "COLLAPSED" | "EXPANDED";
	scrolled: boolean;

	init: (entities: TLibraryStore["entities"]) => void;
	update: ({
		payload,
		user,
	}: {
		payload: Partial<Omit<TLibraryStore, "entities">>;
		user?: TUser | null;
	}) => void;
}

export const useLibraryStore = create<TLibraryStore>((set) => ({
	initialEntities: [],
	entities: [],
	search: "",
	category: "",
	sort: "recents",
	view: "default-list",
	size: "DEFAULT",
	scrolled: false,

	init: (entities) =>
		set((state) => ({ ...state, initialEntities: entities, entities })),

	update: ({ payload, user }) =>
		set((state) => {
			let entities = state.entities;

			if (!payload.search) {
				entities = state.initialEntities;
				state.search = "";
			}

			if (payload.category !== state.category) {
				if (!payload.category) {
					entities = state.initialEntities;
				} else if (payload.category === "playlist-by-spotify") {
					entities = state.initialEntities.filter(
						(t) =>
							t.entity_type === "playlist" &&
							(t.entity as TPlaylistCard).author?.name === "Spotify",
					);
				} else if (payload.category === "playlist-by-user") {
					entities = state.initialEntities.filter(
						(t) =>
							t.entity_type === "playlist" &&
							(t.entity as TPlaylistCard).author?._id === user?._id,
					);
				} else {
					entities = state.initialEntities.filter(
						(t) => t.entity_type === payload.category,
					);
				}
			}

			if (payload.search || state.search) {
				const search = (payload.search || state.search).toLocaleLowerCase();
				entities = entities.filter((t) => {
					const name = t.entity.name.toLocaleLowerCase() ?? "";
					const author =
						"author" in t.entity ? t.entity.author?.name?.toLowerCase() : "";

					return name.includes(search) || author.includes(search);
				});
			}

			sortLibaryEntities(payload.sort || state.sort, entities);

			return {
				...state,
				...payload,
				entities,
			};
		}),
}));

const sortLibaryEntities = (
	type: TLibraryStore["sort"],
	entities: TLibraryStore["entities"],
) => {
	entities.sort((a, b) => {
		const hasPinnedA = a.pinned_at ? 1 : 0;
		const hasPinnedB = b.pinned_at ? 1 : 0;

		if (hasPinnedA !== hasPinnedB) {
			return hasPinnedB - hasPinnedA;
		}

		if (a.pinned_at && b.pinned_at) {
			return new Date(b.pinned_at).getTime() - new Date(a.pinned_at).getTime();
		}

		switch (type) {
			case "recents":
				return (
					(b.last_played_at ? new Date(b.last_played_at).getTime() : 0) -
					(a.last_played_at ? new Date(a.last_played_at).getTime() : 0)
				);

			case "recently-added":
				return new Date(b.added_at).getTime() - new Date(a.added_at).getTime();

			case "alphabetical":
				return (a.entity.name || "").localeCompare(b.entity.name || "");

			case "creator": {
				const creatorA = "author" in a.entity ? a.entity.author?.name : "";
				const creatorB = "author" in b.entity ? b.entity.author?.name : "";

				return (
					creatorA.localeCompare(creatorB) ||
					(a.entity.name || "").localeCompare(b.entity.name || "")
				);
			}
			default:
				return 0;
		}
	});
};
