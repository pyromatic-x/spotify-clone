import { act } from "@testing-library/react";
import { useSidebarStore } from "./store";

describe("useSidebarStore", () => {
	beforeEach(() => {
		act(() => {
			useSidebarStore.setState({
				state: "CLOSED",
				layers: { 0: undefined, 1: undefined, 2: undefined },
				scroll: 0,
				hovered: false,
			});
		});
	});

	it("starts with CLOSED state", () => {
		expect(useSidebarStore.getState().state).toBe("CLOSED");
	});

	it("starts with all layers undefined", () => {
		const { layers } = useSidebarStore.getState();
		expect(layers[0]).toBeUndefined();
		expect(layers[1]).toBeUndefined();
		expect(layers[2]).toBeUndefined();
	});

	describe("toggle", () => {
		it("opens layer 0 with now-playing", () => {
			act(() => useSidebarStore.getState().toggle(0, "now-playing"));
			const { layers, state } = useSidebarStore.getState();
			expect(layers[0]).toBe("now-playing");
			expect(state).toBe("OPENED");
		});

		it("closes layer when toggling same component", () => {
			act(() => useSidebarStore.getState().toggle(0, "now-playing"));
			act(() => useSidebarStore.getState().toggle(0, "now-playing"));
			const { layers, state } = useSidebarStore.getState();
			expect(layers[0]).toBeUndefined();
			expect(state).toBe("CLOSED");
		});

		it("opens layer 1 with queue", () => {
			act(() => useSidebarStore.getState().toggle(1, "queue"));
			expect(useSidebarStore.getState().layers[1]).toBe("queue");
			expect(useSidebarStore.getState().state).toBe("OPENED");
		});

		it("switches layer 1 from queue to devices", () => {
			act(() => useSidebarStore.getState().toggle(1, "queue"));
			act(() => useSidebarStore.getState().toggle(1, "devices"));
			expect(useSidebarStore.getState().layers[1]).toBe("devices");
		});
	});

	describe("onScroll", () => {
		it("updates scroll position", () => {
			act(() => useSidebarStore.getState().onScroll(150));
			expect(useSidebarStore.getState().scroll).toBe(150);
		});
	});

	describe("onHover", () => {
		it("sets hovered to true", () => {
			act(() => useSidebarStore.getState().onHover(true));
			expect(useSidebarStore.getState().hovered).toBe(true);
		});

		it("sets state to PREVIEW when all layers closed and hovered", () => {
			act(() => useSidebarStore.getState().onHover(true));
			expect(useSidebarStore.getState().state).toBe("PREVIEW");
		});

		it("sets state to CLOSED when all layers closed and unhovered", () => {
			act(() => useSidebarStore.getState().onHover(true));
			act(() => useSidebarStore.getState().onHover(false));
			expect(useSidebarStore.getState().state).toBe("CLOSED");
		});

		it("does not change state to PREVIEW when a layer is open", () => {
			act(() => useSidebarStore.getState().toggle(0, "now-playing"));
			act(() => useSidebarStore.getState().onHover(true));
			expect(useSidebarStore.getState().state).toBe("OPENED");
		});
	});
});
