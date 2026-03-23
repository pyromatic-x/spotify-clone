import { UserController } from "./user.controller";
import type { UserService } from "./user.service";

describe("UserController", () => {
	let controller: UserController;
	let service: jest.Mocked<
		Pick<
			UserService,
			| "getUser"
			| "getUserPage"
			| "getUserQueueTracks"
			| "changeQueue"
			| "getSettings"
			| "updateSettings"
		>
	>;

	const mockUser = { _id: "user123", name: "test" };

	beforeEach(() => {
		service = {
			getUser: jest.fn(),
			getUserPage: jest.fn(),
			getUserQueueTracks: jest.fn(),
			changeQueue: jest.fn(),
			getSettings: jest.fn(),
			updateSettings: jest.fn(),
		};

		controller = new UserController(service as unknown as UserService);
	});

	describe("getUser", () => {
		it("should call service.getUser with user id", () => {
			controller.getUser(mockUser as any);
			expect(service.getUser).toHaveBeenCalledWith("user123");
		});
	});

	describe("getUserPage", () => {
		it("should call service.getUserPage with id and user", () => {
			controller.getUserPage("507f1f77bcf86cd799439011", mockUser as any);
			expect(service.getUserPage).toHaveBeenCalledWith({
				id: "507f1f77bcf86cd799439011",
				user: mockUser,
			});
		});
	});

	describe("getUserQueue", () => {
		it("should call service.getUserQueueTracks", () => {
			controller.getUserQueue(mockUser as any);
			expect(service.getUserQueueTracks).toHaveBeenCalledWith({
				user: mockUser,
			});
		});
	});

	describe("changeQueue", () => {
		it("should call service.changeQueue with correct params", () => {
			const body = {
				_id: "507f1f77bcf86cd799439011",
				entity: "album" as const,
				track_id: "track1",
			};
			controller.changeQueue(body, mockUser as any);
			expect(service.changeQueue).toHaveBeenCalledWith({
				_id: "507f1f77bcf86cd799439011",
				entity: "album",
				user_id: "user123",
				track_id: "track1",
			});
		});
	});

	describe("getSettings", () => {
		it("should call service.getSettings", () => {
			controller.getSettings(mockUser as any);
			expect(service.getSettings).toHaveBeenCalledWith({ user: mockUser });
		});
	});

	describe("updateSettings", () => {
		it("should call service.updateSettings with payload and user", () => {
			const payload = { language: "en" };
			controller.updateSettings(payload as any, mockUser as any);
			expect(service.updateSettings).toHaveBeenCalledWith({
				payload,
				user: mockUser,
			});
		});
	});
});
