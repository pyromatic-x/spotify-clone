import type { AlbumService } from "src/album/album.service";
import type { ArtistService } from "src/artist/artist.service";
import type { PlaylistService } from "src/playlist/playlist.service";
import { PersonalService } from "./personal.service";

describe("PersonalService", () => {
	let service: PersonalService;
	let albums: Record<string, jest.Mock>;
	let artists: Record<string, jest.Mock>;
	let playlists: Record<string, jest.Mock>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "TestUser" };

	beforeEach(() => {
		albums = { getMany: jest.fn() };
		artists = { getMany: jest.fn() };
		playlists = { getMany: jest.fn() };

		service = new PersonalService(
			albums as unknown as AlbumService,
			artists as unknown as ArtistService,
			playlists as unknown as PlaylistService,
		);
	});

	describe("get_personal", () => {
		it("should return array of all categories", async () => {
			albums.getMany.mockResolvedValue([]);
			artists.getMany.mockResolvedValue([]);
			playlists.getMany.mockResolvedValue([]);

			const result = await service.get_personal({
				user: mockUser as any,
			});

			expect(result).toHaveLength(6);
		});
	});

	describe("get_category", () => {
		it("should return category data for made-for-you", async () => {
			playlists.getMany.mockResolvedValue([{ _id: "p1" }]);

			const result = await service.get_category({
				category: "made-for-you",
				user: mockUser as any,
			});

			expect(result.title).toBe("Made for you");
			expect(result.entities).toBeDefined();
		});

		it("should return category data for new-releases", async () => {
			albums.getMany.mockResolvedValue([{ _id: "al1" }]);

			const result = await service.get_category({
				category: "new-releases",
				user: mockUser as any,
			});

			expect(result.title).toBe("New releases");
		});

		it("should return category data for favorite-artists", async () => {
			artists.getMany.mockResolvedValue([{ _id: "a1" }]);

			const result = await service.get_category({
				category: "favorite-artists",
				user: mockUser as any,
			});

			expect(result.title).toBe("Favorite artists");
		});

		it("should return category data for top-mixes", async () => {
			playlists.getMany.mockResolvedValue([{ _id: "p1" }]);

			const result = await service.get_category({
				category: "top-mixes",
				user: mockUser as any,
			});

			expect(result.title).toBe("Top mixes");
		});

		it("should return category data for best-of-artists", async () => {
			artists.getMany.mockResolvedValue([{ _id: "a1" }]);

			const result = await service.get_category({
				category: "best-of-artists",
				user: mockUser as any,
			});

			expect(result.title).toBe("Best of artists");
		});
	});

	describe("get_featured", () => {
		it("should include liked playlist when available", async () => {
			playlists.getMany
				.mockResolvedValueOnce([{ _id: "likes", name: "Liked Songs" }])
				.mockResolvedValueOnce([{ _id: "p1" }]);
			albums.getMany.mockResolvedValue([{ _id: "al1" }]);
			artists.getMany.mockResolvedValue([{ _id: "a1" }]);

			const result = await service.get_featured({ user: mockUser as any });

			expect(result.category).toBe("featured");
			expect(result.entities.length).toBeGreaterThan(0);
		});

		it("should handle empty collections", async () => {
			playlists.getMany
				.mockResolvedValueOnce(undefined)
				.mockResolvedValueOnce(undefined);
			albums.getMany.mockResolvedValue(undefined);
			artists.getMany.mockResolvedValue(undefined);

			const result = await service.get_featured({ user: mockUser as any });

			expect(result.category).toBe("featured");
			expect(result.entities).toEqual([]);
		});
	});

	describe("get_made_for_you", () => {
		it("should return made for you playlists", async () => {
			playlists.getMany.mockResolvedValue([{ _id: "p1" }]);

			const result = await service.get_made_for_you({
				user: mockUser as any,
			});

			expect(result.category).toBe("made-for-you");
			expect(result.subtitle).toBe("Made for");
			expect(result.title).toBe("TestUser");
		});
	});

	describe("get_new_releases", () => {
		it("should return new release albums", async () => {
			albums.getMany.mockResolvedValue([{ _id: "al1" }]);

			const result = await service.get_new_releases({});

			expect(result.category).toBe("new-releases");
			expect(result.title).toBe("New releases");
		});

		it("should return empty array when no albums", async () => {
			albums.getMany.mockResolvedValue(undefined);

			const result = await service.get_new_releases({});

			expect(result.entities).toEqual([]);
		});
	});

	describe("get_top_mixes", () => {
		it("should return top mix playlists", async () => {
			playlists.getMany.mockResolvedValue([{ _id: "p1" }]);

			const result = await service.get_top_mixes({});

			expect(result.category).toBe("top-mixes");
		});
	});

	describe("get_favorite_artists", () => {
		it("should return favorite artists", async () => {
			artists.getMany.mockResolvedValue([{ _id: "a1" }]);

			const result = await service.get_favorite_artists({});

			expect(result.category).toBe("favorite-artists");
		});
	});

	describe("get_best_artists", () => {
		it("should return best of artists", async () => {
			artists.getMany.mockResolvedValue([{ _id: "a1" }]);

			const result = await service.get_best_artists({});

			expect(result.category).toBe("best-of-artists");
			expect(result.subtitle).toBeDefined();
		});
	});
});
