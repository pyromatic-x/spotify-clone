import { NotFoundException } from "@nestjs/common";
import { PersonalController } from "./personal.controller";
import type { PersonalService } from "./personal.service";

describe("PersonalController", () => {
	let controller: PersonalController;
	let service: jest.Mocked<
		Pick<PersonalService, "get_personal" | "get_category">
	>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			get_personal: jest.fn(),
			get_category: jest.fn(),
		};

		controller = new PersonalController(
			service as unknown as PersonalService,
		);
	});

	describe("get_personal", () => {
		it("should call service.get_personal with user", () => {
			controller.get_personal(mockUser as any);
			expect(service.get_personal).toHaveBeenCalledWith({ user: mockUser });
		});
	});

	describe("get_category", () => {
		it("should call service.get_category for valid category", () => {
			controller.get_category("made-for-you", mockUser as any);

			expect(service.get_category).toHaveBeenCalledWith({
				category: "made-for-you",
				user: mockUser,
			});
		});

		it("should throw NotFoundException for invalid category", () => {
			expect(() =>
				controller.get_category("invalid" as any, mockUser as any),
			).toThrow(NotFoundException);
		});
	});
});
