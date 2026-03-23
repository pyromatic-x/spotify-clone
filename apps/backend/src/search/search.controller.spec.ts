import { BadRequestException } from "@nestjs/common";
import { SearchController } from "./search.controller";
import type { SearchService } from "./search.service";

describe("SearchController", () => {
	let controller: SearchController;
	let service: jest.Mocked<
		Pick<SearchService, "getGenres" | "getGenrePage" | "search">
	>;
	let cacheManager: jest.Mocked<{ get: jest.Mock; set: jest.Mock }>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			getGenres: jest.fn(),
			getGenrePage: jest.fn(),
			search: jest.fn(),
		};

		cacheManager = {
			get: jest.fn(),
			set: jest.fn(),
		};

		controller = new SearchController(
			service as unknown as SearchService,
			cacheManager as any,
		);
	});

	describe("getAllGenres", () => {
		it("should return cached genres if available", async () => {
			const cached = [{ title: "Pop" }];
			cacheManager.get.mockResolvedValue(cached);

			const result = await controller.getAllGenres(mockUser as any);

			expect(result).toEqual(cached);
			expect(service.getGenres).not.toHaveBeenCalled();
		});

		it("should fetch and cache genres if not cached", async () => {
			cacheManager.get.mockResolvedValue(null);
			const genres = [{ title: "Pop" }];
			service.getGenres.mockResolvedValue(genres as any);

			const result = await controller.getAllGenres(mockUser as any);

			expect(result).toEqual(genres);
			expect(cacheManager.set).toHaveBeenCalledWith(
				"genres",
				genres,
				expect.any(Number),
			);
		});
	});

	describe("getGenrePage", () => {
		it("should return cached genre page if available", async () => {
			const cached = { title: "Pop", items: [] };
			cacheManager.get.mockResolvedValue(cached);

			const result = await controller.getGenrePage(
				"507f1f77bcf86cd799439011",
				mockUser as any,
			);

			expect(result).toEqual(cached);
		});

		it("should fetch and cache genre page if not cached", async () => {
			cacheManager.get.mockResolvedValue(null);
			const page = { title: "Pop", items: [] };
			service.getGenrePage.mockResolvedValue(page as any);

			const result = await controller.getGenrePage(
				"507f1f77bcf86cd799439011",
				mockUser as any,
			);

			expect(result).toEqual(page);
			expect(cacheManager.set).toHaveBeenCalled();
		});
	});

	describe("search", () => {
		it("should call service.search with query and user", () => {
			controller.search("test query", mockUser as any);

			expect(service.search).toHaveBeenCalledWith({
				query: "test query",
				user: mockUser,
			});
		});

		it("should throw BadRequestException if query is empty", () => {
			expect(() => controller.search("", mockUser as any)).toThrow(
				BadRequestException,
			);
		});

		it("should throw BadRequestException if query is undefined", () => {
			expect(() =>
				controller.search(undefined as any, mockUser as any),
			).toThrow(BadRequestException);
		});
	});
});
