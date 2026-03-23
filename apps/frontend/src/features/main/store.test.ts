import { act } from "@testing-library/react";
import { useMainStore } from "./store";

describe("useMainStore", () => {
	it("has initial values", () => {
		const state = useMainStore.getState();
		expect(state.scroll).toBe(0);
		expect(state.accent).toBe("");
		expect(typeof state.width).toBe("number");
	});

	it("updates width", () => {
		act(() => useMainStore.getState().update({ width: 1200 }));
		expect(useMainStore.getState().width).toBe(1200);
	});

	it("updates scroll", () => {
		act(() => useMainStore.getState().update({ scroll: 300 }));
		expect(useMainStore.getState().scroll).toBe(300);
	});

	it("updates accent", () => {
		act(() => useMainStore.getState().update({ accent: "#ff0000" }));
		expect(useMainStore.getState().accent).toBe("#ff0000");
	});

	it("partial update does not reset other fields", () => {
		act(() => useMainStore.getState().update({ width: 900, accent: "#abc" }));
		act(() => useMainStore.getState().update({ scroll: 50 }));
		const state = useMainStore.getState();
		expect(state.width).toBe(900);
		expect(state.accent).toBe("#abc");
		expect(state.scroll).toBe(50);
	});
});
