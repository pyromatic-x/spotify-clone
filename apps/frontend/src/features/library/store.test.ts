import { act } from "@testing-library/react";
import { useLibraryStore } from "./store";

const entity = (name: string, type: string, authorName = "Author") =>
	({
		_id: name,
		entity_type: type,
		added_at: new Date().toISOString(),
		last_played_at: null,
		pinned_at: null,
		entity: {
			_id: name,
			name,
			picture_url: "",
			accent: "",
			author: { _id: "a1", name: authorName },
			extra: {},
		},
	}) as any;

describe("useLibraryStore", () => {
	beforeEach(() => {
		act(() => {
			useLibraryStore.setState({
				initialEntities: [],
				entities: [],
				search: "",
				category: "",
				sort: "recents",
				view: "default-list",
				size: "DEFAULT",
				scrolled: false,
			});
		});
	});

	describe("init", () => {
		it("sets initial entities and entities", () => {
			const items = [entity("A", "playlist"), entity("B", "album")];
			act(() => useLibraryStore.getState().init(items));
			expect(useLibraryStore.getState().entities).toHaveLength(2);
			expect(useLibraryStore.getState().initialEntities).toHaveLength(2);
		});
	});

	describe("update — category filter", () => {
		it("filters by album category", () => {
			const items = [
				entity("A", "playlist"),
				entity("B", "album"),
				entity("C", "album"),
			];
			act(() => useLibraryStore.getState().init(items));
			act(() =>
				useLibraryStore.getState().update({ payload: { category: "album" } }),
			);
			const { entities } = useLibraryStore.getState();
			expect(entities.every((e: any) => e.entity_type === "album")).toBe(true);
			expect(entities).toHaveLength(2);
		});

		it("resets to all entities when category cleared", () => {
			const items = [entity("A", "playlist"), entity("B", "album")];
			act(() => useLibraryStore.getState().init(items));
			act(() =>
				useLibraryStore.getState().update({ payload: { category: "album" } }),
			);
			act(() =>
				useLibraryStore.getState().update({ payload: { category: "" } }),
			);
			expect(useLibraryStore.getState().entities).toHaveLength(2);
		});
	});

	describe("update — search", () => {
		it("filters entities by name", () => {
			const items = [
				entity("Rock Playlist", "playlist"),
				entity("Jazz Album", "album"),
			];
			act(() => useLibraryStore.getState().init(items));
			act(() =>
				useLibraryStore.getState().update({ payload: { search: "rock" } }),
			);
			expect(useLibraryStore.getState().entities).toHaveLength(1);
			expect(useLibraryStore.getState().entities[0].entity.name).toBe(
				"Rock Playlist",
			);
		});

		it("filters by author name", () => {
			const items = [
				entity("Song A", "playlist", "Beatles"),
				entity("Song B", "album", "Mozart"),
			];
			act(() => useLibraryStore.getState().init(items));
			act(() =>
				useLibraryStore.getState().update({ payload: { search: "mozart" } }),
			);
			expect(useLibraryStore.getState().entities).toHaveLength(1);
		});

		it("resets search when empty", () => {
			const items = [entity("A", "playlist"), entity("B", "album")];
			act(() => useLibraryStore.getState().init(items));
			act(() =>
				useLibraryStore.getState().update({ payload: { search: "A" } }),
			);
			act(() =>
				useLibraryStore.getState().update({ payload: { search: "" } }),
			);
			expect(useLibraryStore.getState().entities).toHaveLength(2);
		});
	});

	describe("update — sort", () => {
		it("sorts alphabetically", () => {
			const items = [
				entity("Zebra", "playlist"),
				entity("Apple", "album"),
				entity("Mango", "artist"),
			];
			act(() => useLibraryStore.getState().init(items));
			act(() =>
				useLibraryStore.getState().update({
					payload: { sort: "alphabetical" },
				}),
			);
			const names = useLibraryStore
				.getState()
				.entities.map((e: any) => e.entity.name);
			expect(names).toEqual(["Apple", "Mango", "Zebra"]);
		});
	});

	describe("update — view and size", () => {
		it("updates view", () => {
			act(() =>
				useLibraryStore
					.getState()
					.update({ payload: { view: "compact-grid" } }),
			);
			expect(useLibraryStore.getState().view).toBe("compact-grid");
		});

		it("updates size", () => {
			act(() =>
				useLibraryStore
					.getState()
					.update({ payload: { size: "COLLAPSED" } }),
			);
			expect(useLibraryStore.getState().size).toBe("COLLAPSED");
		});
	});
});
