import { AppController } from "./app.controller";

describe("AppController", () => {
	let controller: AppController;

	beforeEach(() => {
		controller = new AppController();
	});

	describe("ping", () => {
		it("should return undefined", () => {
			expect(controller.ping()).toBeUndefined();
		});
	});

	describe("get", () => {
		it("should return status OK", () => {
			expect(controller.get()).toEqual({ status: "OK" });
		});
	});
});
