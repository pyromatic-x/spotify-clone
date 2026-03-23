import { NotFoundException } from "@nestjs/common";
import type { TrackService } from "src/track/track.service";
import { AlbumService } from "./album.service";

describe("AlbumService", () => {
	let service: AlbumService;
	let model: Record<string, jest.Mock>;
	let tracks: Record<string, jest.Mock>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "test" };

	beforeEach(() => {
		model = {
			aggregate: jest.fn(),
			countDocuments: jest.fn(),
			findOne: jest.fn(),
		};

		tracks = { getMany: jest.fn() };

		service = new AlbumService(
			model as any,
			tracks as unknown as TrackService,
		);
	});

	describe("getAlbumPage", () => {
		it("should return album page data", async () => {
			const albumData = {
				_id: "al1",
				name: "Album",
				author: { _id: "a1", name: "Artist" },
				tracks: [{ _id: "t1" }, { _id: "t2" }],
				in_library: false,
			};
			model.aggregate
				.mockResolvedValueOnce([albumData])
				.mockResolvedValueOnce([{ _id: "al2", name: "Other Album" }]);
			tracks.getMany.mockResolvedValue([
				{ _id: "t1", duration: 200 },
				{ _id: "t2", duration: 180 },
			]);

			const result = await service.getAlbumPage({
				id: "507f1f77bcf86cd799439011",
				user: mockUser as any,
			});

			expect(result.name).toBe("Album");
			expect(tracks.getMany).toHaveBeenCalled();
		});

		it("should throw NotFoundException if album not found", async () => {
			model.aggregate.mockResolvedValue([]);

			await expect(
				service.getAlbumPage({
					id: "507f1f77bcf86cd799439011",
					user: mockUser as any,
				}),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe("getMany", () => {
		it("should return album cards", async () => {
			const cards = [{ _id: "al1", name: "Album", entity: "album" }];
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

	describe("getFeed", () => {
		it("should return paginated albums", async () => {
			const albums = [{ _id: "al1", name: "Album" }];
			model.aggregate.mockResolvedValue(albums);
			model.countDocuments.mockResolvedValue(10);

			const result = await service.getFeed({ page: 1 });

			expect(result.page).toBe(1);
			expect(result.per_page).toBe(5);
			expect(result.albums).toEqual(albums);
			expect(result.has_more).toBe(true);
		});

		it("should return has_more false on last page", async () => {
			model.aggregate.mockResolvedValue([]);
			model.countDocuments.mockResolvedValue(5);

			const result = await service.getFeed({ page: 1 });

			expect(result.has_more).toBe(false);
		});
	});

	describe("getOne", () => {
		it("should call model.findOne with query", () => {
			service.getOne({ _id: "al1" } as any);
			expect(model.findOne).toHaveBeenCalledWith({ _id: "al1" });
		});
	});
});
