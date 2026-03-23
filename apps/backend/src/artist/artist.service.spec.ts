import { NotFoundException } from "@nestjs/common";
import type { AlbumService } from "src/album/album.service";
import type { PlaylistService } from "src/playlist/playlist.service";
import type { TrackService } from "src/track/track.service";
import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
	let service: ArtistService;
	let model: Record<string, jest.Mock>;
	let tracks: Record<string, jest.Mock>;
	let albums: Record<string, jest.Mock>;
	let playlists: Record<string, jest.Mock>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "test" };

	beforeEach(() => {
		model = {
			aggregate: jest.fn(),
			findOne: jest.fn(),
		};

		tracks = { getMany: jest.fn(), getManyRaw: jest.fn() };
		albums = { getMany: jest.fn() };
		playlists = { getMany: jest.fn(), getUserPlaylists: jest.fn() };

		service = new ArtistService(
			model as any,
			tracks as unknown as TrackService,
			albums as unknown as AlbumService,
			playlists as unknown as PlaylistService,
		);
	});

	describe("getMany", () => {
		it("should return artist cards", async () => {
			const cards = [{ _id: "a1", name: "Artist", entity: "artist" }];
			model.aggregate.mockResolvedValue(cards);

			const result = await service.getMany({ query: {} });

			expect(result).toEqual(cards);
		});

		it("should return undefined if no results", async () => {
			model.aggregate.mockResolvedValue([]);

			const result = await service.getMany({ query: {} });

			expect(result).toBeUndefined();
		});
	});

	describe("getArtistPage", () => {
		it("should return artist page data", async () => {
			const artistData = {
				_id: "a1",
				name: "Artist",
				in_library: false,
			};

			model.aggregate
				.mockResolvedValueOnce([artistData]) // getArtistPage
				.mockResolvedValueOnce([{ _id: "a2" }]) // getMany (similar_artists)
				.mockResolvedValueOnce([{ tracks: [{ _id: "t1" }] }]); // getPlaylistsWithArtist

			tracks.getMany.mockResolvedValue([]);
			albums.getMany
				.mockResolvedValueOnce([{ _id: "al1" }])
				.mockResolvedValueOnce([]);
			playlists.getMany.mockResolvedValue(undefined);

			const result = await service.getArtistPage({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result.name).toBe("Artist");
		});

		it("should throw NotFoundException if artist not found", async () => {
			model.aggregate.mockResolvedValue([]);

			await expect(
				service.getArtistPage({
					id: "507f1f77bcf86cd799439011",
					user: mockUser as any,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe("getArtistLikedTracks", () => {
		it("should return liked tracks by artist", async () => {
			playlists.getUserPlaylists.mockResolvedValue([
				{ tracks: [{ _id: "t1", added_at: new Date() }] },
			]);
			tracks.getMany.mockResolvedValue([{ _id: "t1", name: "Track" }]);

			const result = await service.getArtistLikedTracks({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result).toHaveLength(1);
		});
	});

	describe("getOne", () => {
		it("should call model.findOne with query", () => {
			service.getOne({ _id: "a1" } as any);
			expect(model.findOne).toHaveBeenCalledWith({ _id: "a1" });
		});
	});
});
