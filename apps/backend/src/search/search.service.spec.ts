import { NotFoundException } from "@nestjs/common";
import type { AlbumService } from "src/album/album.service";
import type { ArtistService } from "src/artist/artist.service";
import type { PlaylistService } from "src/playlist/playlist.service";
import type { TrackService } from "src/track/track.service";
import type { UserService } from "src/user/user.service";
import { SearchService } from "./search.service";

describe("SearchService", () => {
	let service: SearchService;
	let model: Record<string, jest.Mock>;
	let albums: Record<string, jest.Mock>;
	let playlists: Record<string, jest.Mock>;
	let artists: Record<string, jest.Mock>;
	let users: Record<string, jest.Mock>;
	let tracks: Record<string, jest.Mock>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "test" };

	beforeEach(() => {
		model = { find: jest.fn(), findById: jest.fn() };
		albums = { getMany: jest.fn() };
		playlists = { getMany: jest.fn() };
		artists = { getMany: jest.fn() };
		users = { getMany: jest.fn() };
		tracks = { getMany: jest.fn() };

		service = new SearchService(
			model as any,
			albums as unknown as AlbumService,
			playlists as unknown as PlaylistService,
			artists as unknown as ArtistService,
			users as unknown as UserService,
			tracks as unknown as TrackService,
		);
	});

	describe("getGenres", () => {
		it("should return all genres", async () => {
			const genres = [{ _id: "g1", title: "Pop" }];
			model.find.mockResolvedValue(genres);

			const result = await service.getGenres();

			expect(result).toEqual(genres);
		});
	});

	describe("getGenrePage", () => {
		it("should return genre page with items", async () => {
			const genre = { _id: "g1", title: "Pop", color: "#ff0000" };
			const lean = jest.fn().mockResolvedValue(genre);
			model.findById.mockReturnValue({ lean });

			albums.getMany.mockResolvedValue([{ _id: "al1" }]);
			playlists.getMany
				.mockResolvedValueOnce([{ _id: "p1" }])
				.mockResolvedValueOnce([{ _id: "p2" }]);

			const result = await service.getGenrePage({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result.title).toBe("Pop");
			expect(result.items).toHaveLength(3);
		});

		it("should throw NotFoundException if genre not found", async () => {
			const lean = jest.fn().mockResolvedValue(null);
			model.findById.mockReturnValue({ lean });

			await expect(
				service.getGenrePage({
					id: "507f1f77bcf86cd799439011",
					user: mockUser as any,
				}),
			).rejects.toThrow(NotFoundException);
		});

		it("should skip empty sections", async () => {
			const genre = { _id: "g1", title: "Pop", color: "#ff0000" };
			const lean = jest.fn().mockResolvedValue(genre);
			model.findById.mockReturnValue({ lean });

			albums.getMany.mockResolvedValue(undefined);
			playlists.getMany
				.mockResolvedValueOnce(undefined)
				.mockResolvedValueOnce(undefined);

			const result = await service.getGenrePage({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result.items).toHaveLength(0);
		});
	});

	describe("search", () => {
		it("should search across all entities", async () => {
			tracks.getMany.mockResolvedValue([{ _id: "t1" }]);
			artists.getMany.mockResolvedValue([{ _id: "a1" }]);
			albums.getMany.mockResolvedValue([{ _id: "al1" }]);
			playlists.getMany.mockResolvedValue([{ _id: "p1" }]);
			users.getMany.mockResolvedValue([{ _id: "u1" }]);

			const result = await service.search({
				query: "test",
				user: mockUser as any,
			});

			expect(result.tracks).toHaveLength(1);
			expect(result.artists).toHaveLength(1);
			expect(result.albums).toHaveLength(1);
			expect(result.playlists).toHaveLength(1);
			expect(result.users).toHaveLength(1);
		});

		it("should return undefined for tracks when empty", async () => {
			tracks.getMany.mockResolvedValue([]);
			artists.getMany.mockResolvedValue(undefined);
			albums.getMany.mockResolvedValue(undefined);
			playlists.getMany.mockResolvedValue(undefined);
			users.getMany.mockResolvedValue(undefined);

			const result = await service.search({
				query: "nonexistent",
				user: mockUser as any,
			});

			expect(result.tracks).toBeUndefined();
		});

		it("should truncate query to 200 chars", async () => {
			tracks.getMany.mockResolvedValue([]);
			artists.getMany.mockResolvedValue(undefined);
			albums.getMany.mockResolvedValue(undefined);
			playlists.getMany.mockResolvedValue(undefined);
			users.getMany.mockResolvedValue(undefined);

			const longQuery = "a".repeat(300);
			await service.search({ query: longQuery, user: mockUser as any });

			const call = tracks.getMany.mock.calls[0][0];
			expect(call.query.name.source.length).toBeLessThanOrEqual(200);
		});
	});
});
