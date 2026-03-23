import { LibraryService } from "./library.service";

describe("LibraryService", () => {
	let service: LibraryService;
	let model: Record<string, jest.Mock>;

	beforeEach(() => {
		model = {
			aggregate: jest.fn(),
			countDocuments: jest.fn(),
			deleteOne: jest.fn(),
			create: jest.fn(),
		};

		service = new LibraryService(model as any);
	});

	describe("getMany", () => {
		it("should return library entities", async () => {
			const entities = [
				{ _id: "1", entity: { name: "Test" }, entity_type: "artist" },
			];
			model.aggregate.mockResolvedValue(entities);

			const result = await service.getMany({ query: {} });

			expect(result).toEqual(entities);
			expect(model.aggregate).toHaveBeenCalled();
		});
	});

	describe("getCount", () => {
		it("should return count of documents", async () => {
			model.countDocuments.mockResolvedValue(5);

			const result = await service.getCount({ query: {} });

			expect(result).toBe(5);
		});
	});

	describe("toggleFollow", () => {
		const params = {
			target_id: "507f1f77bcf86cd799439011" as any,
			type: "artist" as const,
			user_id: "507f1f77bcf86cd799439012",
		};

		it("should unfollow if already following", async () => {
			model.countDocuments.mockResolvedValue(1);
			model.deleteOne.mockResolvedValue({});

			const result = await service.toggleFollow(params);

			expect(result).toBe(false);
			expect(model.deleteOne).toHaveBeenCalled();
		});

		it("should follow if not following", async () => {
			model.countDocuments.mockResolvedValue(0);
			model.create.mockResolvedValue({});

			const result = await service.toggleFollow(params);

			expect(result).toBe(true);
			expect(model.create).toHaveBeenCalledWith(
				expect.objectContaining({
					entity_type: "artist",
					target_id: params.target_id,
				}),
			);
		});
	});

	describe("isFollowing", () => {
		it("should return true if following", async () => {
			model.countDocuments.mockResolvedValue(1);

			const result = await service.isFollowing({
				target_id: "507f1f77bcf86cd799439011" as any,
				type: "artist",
				user_id: "507f1f77bcf86cd799439012",
			});

			expect(result).toBe(true);
		});

		it("should return false if not following", async () => {
			model.countDocuments.mockResolvedValue(0);

			const result = await service.isFollowing({
				target_id: "507f1f77bcf86cd799439011" as any,
				type: "artist",
				user_id: "507f1f77bcf86cd799439012",
			});

			expect(result).toBe(false);
		});
	});
});
