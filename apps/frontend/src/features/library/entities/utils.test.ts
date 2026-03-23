import { getLibraryEntityDescription } from "./utils";

const makeEntity = (
	type: string,
	opts: {
		albumType?: string;
		tracksCount?: number;
		isCollection?: boolean;
		authorName?: string;
		pinnedAt?: string;
	} = {},
) =>
	({
		entity_type: type,
		pinned_at: opts.pinnedAt,
		entity: {
			name: "Test",
			author: opts.authorName ? { _id: "a1", name: opts.authorName } : undefined,
			extra: {
				album_type: opts.albumType,
				tracks_count: opts.tracksCount,
				is_collection: opts.isCollection ?? false,
			},
		},
	}) as any;

describe("getLibraryEntityDescription", () => {
	describe('category = ""', () => {
		it("returns capitalized type for plain entity", () => {
			const result = getLibraryEntityDescription({
				category: "",
				entity: makeEntity("artist"),
			});
			expect(result.title).toBe("Artist");
		});

		it("returns album_type and author for album", () => {
			const result = getLibraryEntityDescription({
				category: "",
				entity: makeEntity("album", {
					albumType: "single",
					authorName: "Beatles",
				}),
			});
			expect(result.title).toBe("Single");
			expect(result.subtitle).toBe("Beatles");
		});

		it("returns tracks_count as subtitle when pinned", () => {
			const result = getLibraryEntityDescription({
				category: "",
				entity: makeEntity("playlist", {
					tracksCount: 42,
					authorName: "User",
					pinnedAt: "2025-01-01",
				}),
			});
			expect(result.subtitle).toBe("42 songs");
		});

		it("returns author name as subtitle when not pinned and has tracks_count", () => {
			const result = getLibraryEntityDescription({
				category: "",
				entity: makeEntity("playlist", {
					tracksCount: 10,
					authorName: "User",
				}),
			});
			expect(result.subtitle).toBe("User");
		});
	});

	describe('category = "album"', () => {
		it("returns author name as title for album type", () => {
			const result = getLibraryEntityDescription({
				category: "album",
				entity: makeEntity("album", {
					albumType: "album",
					authorName: "Radiohead",
				}),
			});
			expect(result.title).toBe("Radiohead");
		});

		it("returns capitalized album_type for non-album types", () => {
			const result = getLibraryEntityDescription({
				category: "album",
				entity: makeEntity("album", {
					albumType: "ep",
					authorName: "Muse",
				}),
			});
			expect(result.title).toBe("Ep");
			expect(result.subtitle).toBe("Muse");
		});
	});

	describe("category includes playlist", () => {
		it("returns author name as title", () => {
			const result = getLibraryEntityDescription({
				category: "playlist",
				entity: makeEntity("playlist", { authorName: "Spotify" }),
			});
			expect(result.title).toBe("Spotify");
		});

		it("returns tracks count when is_collection", () => {
			const result = getLibraryEntityDescription({
				category: "playlist",
				entity: makeEntity("playlist", {
					isCollection: true,
					tracksCount: 55,
				}),
			});
			expect(result.title).toBe("55 songs");
		});
	});
});
