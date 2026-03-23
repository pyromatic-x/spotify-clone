import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EventBus } from "./event-bus";

describe("EventBus", () => {
	beforeEach(() => {
		vi.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("calls subscriber when event is emitted", () => {
		const callback = vi.fn();
		EventBus.subscribe("entity-page:controls-scrolled", callback);

		EventBus.emit("entity-page:controls-scrolled", true);

		expect(callback).toHaveBeenCalledWith(true);
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("supports multiple subscribers for same event", () => {
		const cb1 = vi.fn();
		const cb2 = vi.fn();

		EventBus.subscribe("entity-page:controls-scrolled", cb1);
		EventBus.subscribe("entity-page:controls-scrolled", cb2);

		EventBus.emit("entity-page:controls-scrolled", false);

		expect(cb1).toHaveBeenCalledWith(false);
		expect(cb2).toHaveBeenCalledWith(false);
	});

	it("unsubscribes correctly", () => {
		const callback = vi.fn();
		const unsub = EventBus.subscribe("entity-page:controls-scrolled", callback);

		unsub();

		EventBus.emit("entity-page:controls-scrolled", true);

		expect(callback).not.toHaveBeenCalled();
	});

	it("does not throw when emitting event with no listeners", () => {
		expect(() =>
			EventBus.emit("scrollable:reset/{id}", { id: "test" }),
		).not.toThrow();
	});
});
