import { ArtistController } from "./artist.controller";
import type { ArtistService } from "./artist.service";

describe("ArtistController", () => {
	let controller: ArtistController;
	let service: jest.Mocked<
		Pick<ArtistService, "getArtistPage" | "getArtistLikedTracks">
	>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			getArtistPage: jest.fn(),
			getArtistLikedTracks: jest.fn(),
		};

		controller = new ArtistController(service as unknown as ArtistService);
	});

	describe("getArtistPage", () => {
		it("should call service.getArtistPage with id and user", () => {
			const id = "507f1f77bcf86cd799439011";
			controller.getArtistPage(id, mockUser as any);

			expect(service.getArtistPage).toHaveBeenCalledWith({
				id,
				user: mockUser,
			});
		});
	});

	describe("getArtistLikedTracksPage", () => {
		it("should call service.getArtistLikedTracks", () => {
			const id = "507f1f77bcf86cd799439011";
			controller.getArtistLikedTracksPage(id, mockUser as any);

			expect(service.getArtistLikedTracks).toHaveBeenCalledWith({
				id,
				user: mockUser,
			});
		});
	});
});
