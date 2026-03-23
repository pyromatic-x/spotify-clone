import { AlbumController } from "./album.controller";
import type { AlbumService } from "./album.service";

describe("AlbumController", () => {
	let controller: AlbumController;
	let service: jest.Mocked<Pick<AlbumService, "getAlbumPage" | "getFeed">>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			getAlbumPage: jest.fn(),
			getFeed: jest.fn(),
		};

		controller = new AlbumController(service as unknown as AlbumService);
	});

	describe("getAlbumPage", () => {
		it("should call service.getAlbumPage with id and user", () => {
			const id = "507f1f77bcf86cd799439011";
			controller.getAlbumPage(id, mockUser as any);

			expect(service.getAlbumPage).toHaveBeenCalledWith({
				id,
				user: mockUser,
			});
		});
	});

	describe("getFeed", () => {
		it("should call service.getFeed with page from query", () => {
			controller.getFeed({ page: 2 } as any);

			expect(service.getFeed).toHaveBeenCalledWith({ page: 2 });
		});

		it("should default page to 1", () => {
			controller.getFeed({ page: 1 } as any);

			expect(service.getFeed).toHaveBeenCalledWith({ page: 1 });
		});
	});
});
