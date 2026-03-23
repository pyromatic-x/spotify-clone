import { NotFoundException } from "@nestjs/common";
import type { AlbumService } from "src/album/album.service";
import type { ArtistService } from "src/artist/artist.service";
import type { LibraryService } from "src/library/library.service";
import type { PlaylistService } from "src/playlist/playlist.service";
import type { TrackService } from "src/track/track.service";
import { UserService } from "./user.service";

describe("UserService", () => {
	let service: UserService;
	let model: Record<string, jest.Mock>;
	let library: Record<string, jest.Mock>;
	let tracks: Record<string, jest.Mock>;
	let artists: Record<string, jest.Mock>;
	let playlists: Record<string, jest.Mock>;
	let albums: Record<string, jest.Mock>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		model = {
			exists: jest.fn(),
			findById: jest.fn(),
			findOne: jest.fn(),
			findOneAndUpdate: jest.fn(),
			findByIdAndUpdate: jest.fn(),
			aggregate: jest.fn(),
		};

		library = { getMany: jest.fn(), getCount: jest.fn() };
		tracks = { getMany: jest.fn() };
		artists = { getMany: jest.fn() };
		playlists = { getMany: jest.fn() };
		albums = { getOne: jest.fn() };

		service = new UserService(
			model as any,
			library as unknown as LibraryService,
			tracks as unknown as TrackService,
			artists as unknown as ArtistService,
			playlists as unknown as PlaylistService,
			albums as unknown as AlbumService,
		);
	});

	describe("exists", () => {
		it("should return true if user exists", async () => {
			model.exists.mockResolvedValue({ _id: "user123" });

			const result = await service.exists("507f1f77bcf86cd799439011");

			expect(result).toBe(true);
		});

		it("should return false if user does not exist", async () => {
			model.exists.mockResolvedValue(null);

			const result = await service.exists("507f1f77bcf86cd799439011");

			expect(result).toBe(false);
		});
	});

	describe("getUser", () => {
		it("should return user data", async () => {
			const lean = jest.fn().mockResolvedValue({
				_id: "507f1f77bcf86cd799439011",
				name: "Test User",
				picture_url: "pic.jpg",
			});
			model.findById.mockReturnValue({ lean });

			const result = await service.getUser("507f1f77bcf86cd799439011");

			expect(result).toEqual({
				_id: "507f1f77bcf86cd799439011",
				name: "Test User",
				picture_url: "pic.jpg",
			});
		});

		it("should throw NotFoundException if user not found", async () => {
			const lean = jest.fn().mockResolvedValue(null);
			model.findById.mockReturnValue({ lean });

			await expect(service.getUser("507f1f77bcf86cd799439011")).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe("findOne", () => {
		it("should return user", async () => {
			const lean = jest.fn().mockResolvedValue({ _id: "id", name: "Test" });
			const select = jest.fn().mockReturnValue({ lean });
			model.findOne.mockReturnValue({ select, lean });

			const result = await service.findOne({ name: "Test" });

			expect(result).toEqual({ _id: "id", name: "Test" });
		});

		it("should select password when withPassword is true", async () => {
			const lean = jest.fn().mockResolvedValue({
				_id: "id",
				name: "Test",
				password: "hash",
			});
			const select = jest.fn().mockReturnValue({ lean });
			model.findOne.mockReturnValue({ select, lean });

			const result = await service.findOne(
				{ name: "Test" },
				{ withPassword: true },
			);

			expect(select).toHaveBeenCalledWith("+password");
			expect(result.password).toBe("hash");
		});

		it("should throw NotFoundException if user not found", async () => {
			const lean = jest.fn().mockResolvedValue(null);
			model.findOne.mockReturnValue({
				lean,
				select: jest.fn().mockReturnValue({ lean }),
			});

			await expect(service.findOne({ name: "missing" })).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe("getSettings", () => {
		it("should return user settings", async () => {
			const settings = { language: "en" };
			const lean = jest.fn().mockResolvedValue({ settings });
			const select = jest.fn().mockReturnValue({ lean });
			model.findById.mockReturnValue({ select });

			const result = await service.getSettings({ user: mockUser as any });

			expect(result).toEqual(settings);
		});
	});

	describe("updateSettings", () => {
		it("should update and return settings", async () => {
			const settings = { language: "en" };
			const lean = jest.fn().mockResolvedValue({ settings });
			const select = jest.fn().mockReturnValue({ lean });
			model.findByIdAndUpdate.mockReturnValue({ select });

			const result = await service.updateSettings({
				payload: { language: "en" },
				user: mockUser as any,
			});

			expect(result).toEqual(settings);
		});
	});

	describe("getMany", () => {
		it("should return array of user cards", async () => {
			const cards = [{ _id: "1", name: "User", entity: "user" }];
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

	describe("transformLibraryEntityToUserCard", () => {
		it("should transform library entity to user card", () => {
			const entity = {
				entity: {
					_id: "123",
					name: "User",
					picture_url: "pic.jpg",
					author: { _id: "a", name: "Author" },
				},
			} as any;

			const result = service.transformLibraryEntityToUserCard(entity);

			expect(result).toEqual({
				_id: "123",
				name: "User",
				picture_url: "pic.jpg",
				entity: "user",
			});
			expect(result).not.toHaveProperty("author");
		});
	});
});
