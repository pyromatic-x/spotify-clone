import { PlaylistController } from "./playlist.controller";
import type { PlaylistService } from "./playlist.service";

describe("PlaylistController", () => {
	let controller: PlaylistController;
	let service: jest.Mocked<Pick<PlaylistService, "getPlaylistPage">>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			getPlaylistPage: jest.fn(),
		};

		controller = new PlaylistController(
			service as unknown as PlaylistService,
		);
	});

	describe("getPlaylistPage", () => {
		it("should call service.getPlaylistPage with id and user", () => {
			const id = "507f1f77bcf86cd799439011";
			controller.getPlaylistPage(id, mockUser as any);

			expect(service.getPlaylistPage).toHaveBeenCalledWith({
				id,
				user: mockUser,
			});
		});
	});
});
