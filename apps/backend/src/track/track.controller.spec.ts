import { TrackController } from "./track.controller";
import type { TrackService } from "./track.service";

describe("TrackController", () => {
	let controller: TrackController;
	let service: jest.Mocked<Pick<TrackService, "getNowPlaying">>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			getNowPlaying: jest.fn(),
		};

		controller = new TrackController(service as unknown as TrackService);
	});

	describe("getNowPlaying", () => {
		it("should call service.getNowPlaying with id and user", () => {
			const id = "507f1f77bcf86cd799439011";
			controller.getNowPlaying(id, mockUser as any);

			expect(service.getNowPlaying).toHaveBeenCalledWith({
				id,
				user: mockUser,
			});
		});
	});
});
