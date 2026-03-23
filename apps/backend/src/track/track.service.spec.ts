import { NotFoundException } from "@nestjs/common";
import type { LibraryService } from "src/library/library.service";
import { TrackService } from "./track.service";

describe("TrackService", () => {
	let service: TrackService;
	let model: Record<string, jest.Mock>;
	let library: Record<string, jest.Mock>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "test" };

	beforeEach(() => {
		model = {
			aggregate: jest.fn(),
			find: jest.fn(),
		};

		library = {
			isFollowing: jest.fn(),
		};

		service = new TrackService(
			model as any,
			library as unknown as LibraryService,
		);
	});

	describe("getMany", () => {
		it("should return tracks from aggregation", async () => {
			const tracks = [
				{ _id: "t1", name: "Track 1", duration: 200 },
				{ _id: "t2", name: "Track 2", duration: 180 },
			];
			model.aggregate.mockResolvedValue(tracks);

			const result = await service.getMany({
				query: {},
				user: mockUser as any,
			});

			expect(result).toEqual(tracks);
			expect(model.aggregate).toHaveBeenCalled();
		});

		it("should return empty array if no results", async () => {
			model.aggregate.mockResolvedValue([]);

			const result = await service.getMany({
				query: {},
				user: mockUser as any,
			});

			expect(result).toEqual([]);
		});

		it("should return empty array if response is null", async () => {
			model.aggregate.mockResolvedValue(null as any);

			const result = await service.getMany({
				query: {},
				user: mockUser as any,
			});

			expect(result).toEqual([]);
		});
	});

	describe("getManyRaw", () => {
		it("should call model.find with query", async () => {
			const query = { author: "507f1f77bcf86cd799439011" };
			model.find.mockResolvedValue([]);

			await service.getManyRaw(query as any);

			expect(model.find).toHaveBeenCalledWith(query);
		});
	});

	describe("getNowPlaying", () => {
		it("should return now playing data", async () => {
			const authorId = "507f1f77bcf86cd799439012";
			const trackData = {
				_id: "t1",
				name: "Track",
				author: {
					_id: authorId,
					name: "Artist",
					backdrop_url: "bg.jpg",
					about: {},
					listeners: {},
					links: [],
				},
				album: { _id: "al1", name: "Album" },
				credits: [],
				in_library: false,
			};
			model.aggregate.mockResolvedValue([trackData]);
			library.isFollowing.mockResolvedValue(false);

			const result = await service.getNowPlaying({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result.name).toBe("Track");
			expect(result.author.is_following).toBe(false);
			expect(result.credits).toHaveLength(2);
		});

		it("should throw NotFoundException if track not found", async () => {
			model.aggregate.mockResolvedValue([]);

			await expect(
				service.getNowPlaying({
					id: "507f1f77bcf86cd799439011",
					user: mockUser as any,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});
});
