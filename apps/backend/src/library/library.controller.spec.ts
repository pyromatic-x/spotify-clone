import { LibraryController } from "./library.controller";
import type { LibraryService } from "./library.service";

describe("LibraryController", () => {
	let controller: LibraryController;
	let service: jest.Mocked<
		Pick<LibraryService, "getMany" | "isFollowing" | "toggleFollow">
	>;

	const mockUser = { _id: "507f1f77bcf86cd799439011", name: "test" };

	beforeEach(() => {
		service = {
			getMany: jest.fn(),
			isFollowing: jest.fn(),
			toggleFollow: jest.fn(),
		};

		controller = new LibraryController(
			service as unknown as LibraryService,
		);
	});

	describe("get", () => {
		it("should call service.getMany with user_id query", () => {
			controller.get(mockUser as any);

			expect(service.getMany).toHaveBeenCalledWith({
				query: expect.objectContaining({ user_id: expect.anything() }),
			});
		});
	});

	describe("isFollowing", () => {
		it("should return following status", async () => {
			service.isFollowing.mockResolvedValue(true);

			const result = await controller.isFollowing(
				"artist",
				"507f1f77bcf86cd799439012",
				mockUser as any,
			);

			expect(result).toEqual({ following: true });
		});
	});

	describe("toggleFollow", () => {
		it("should call service.toggleFollow", () => {
			controller.toggleFollow(
				"artist",
				"507f1f77bcf86cd799439012",
				mockUser as any,
			);

			expect(service.toggleFollow).toHaveBeenCalledWith({
				target_id: expect.anything(),
				type: "artist",
				user_id: mockUser._id,
			});
		});
	});
});
