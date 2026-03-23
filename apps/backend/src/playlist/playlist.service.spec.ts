import { NotFoundException } from "@nestjs/common";
import type { TrackService } from "src/track/track.service";
import { PlaylistService } from "./playlist.service";

describe("PlaylistService", () => {
	let service: PlaylistService;
	let model: Record<string, jest.Mock>;
	let tracks: Record<string, jest.Mock>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "test" };

	beforeEach(() => {
		model = {
			aggregate: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			findOneAndUpdate: jest.fn(),
		};

		tracks = { getMany: jest.fn() };

		service = new PlaylistService(
			model as any,
			tracks as unknown as TrackService,
		);
	});

	describe("getMany", () => {
		it("should return playlist cards", async () => {
			const cards = [{ _id: "p1", name: "Playlist", entity: "playlist" }];
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

	describe("getPlaylistPage", () => {
		it("should return playlist page data", async () => {
			const playlistData = {
				_id: "p1",
				name: "My Playlist",
				author: { _id: "u1", name: "User" },
				tracks: [{ _id: "t1" }, { _id: "t2" }],
				in_library: false,
			};
			model.aggregate.mockResolvedValue([playlistData]);
			tracks.getMany
				.mockResolvedValueOnce([
					{ _id: "t1", duration: 200 },
					{ _id: "t2", duration: 180 },
				])
				.mockResolvedValueOnce([]);

			const result = await service.getPlaylistPage({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result.name).toBe("My Playlist");
			expect(result.tracks_count).toBe(2);
			expect(result.total_duration).toBe(380);
		});

		it("should throw NotFoundException if playlist not found", async () => {
			model.aggregate.mockResolvedValue([]);

			await expect(
				service.getPlaylistPage({
					id: "507f1f77bcf86cd799439011",
					user: mockUser as any,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe("getUserPlaylists", () => {
		it("should return user playlists", async () => {
			const lean = jest.fn().mockResolvedValue([{ _id: "p1" }]);
			model.find.mockReturnValue({ lean });

			const result = await service.getUserPlaylists({
				user: mockUser as any,
			});

			expect(result).toEqual([{ _id: "p1" }]);
		});
	});

	describe("getOne", () => {
		it("should call model.findOne with query", () => {
			service.getOne({ _id: "p1" } as any);
			expect(model.findOne).toHaveBeenCalledWith({ _id: "p1" });
		});
	});

	describe("isTrackLiked", () => {
		it("should return true if track is in user playlists", async () => {
			const lean = jest
				.fn()
				.mockResolvedValue([
					{ tracks: [{ _id: "t1" }, { _id: "t2" }] },
				]);
			model.find.mockReturnValue({ lean });

			const result = await service.isTrackLiked({
				id: "t1",
				user: mockUser as any,
			});

			expect(result).toBe(true);
		});

		it("should return false if track is not in user playlists", async () => {
			const lean = jest
				.fn()
				.mockResolvedValue([{ tracks: [{ _id: "t2" }] }]);
			model.find.mockReturnValue({ lean });

			const result = await service.isTrackLiked({
				id: "t999",
				user: mockUser as any,
			});

			expect(result).toBe(false);
		});
	});

	describe("likeTrack", () => {
		it("should add track to liked songs playlist", async () => {
			model.findOneAndUpdate.mockResolvedValue({});

			const result = await service.likeTrack({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result).toBe(true);
			expect(model.findOneAndUpdate).toHaveBeenCalled();
		});
	});
});
