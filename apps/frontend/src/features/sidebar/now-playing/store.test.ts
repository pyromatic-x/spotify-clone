import { act } from "@testing-library/react";
import { useFullscreenStore } from "./store";

describe("useFullscreenStore", () => {
	beforeEach(() => {
		act(() => {
			useFullscreenStore.setState({ scroll: 0, image: "artwork" });
		});
	});

	it("has correct initial values", () => {
		const state = useFullscreenStore.getState();
		expect(state.scroll).toBe(0);
		expect(state.image).toBe("artwork");
	});

	it("updates image via update()", () => {
		act(() => useFullscreenStore.getState().update({ image: "artist" }));
		expect(useFullscreenStore.getState().image).toBe("artist");
	});

	it("updates scroll via onScroll()", () => {
		act(() => useFullscreenStore.getState().onScroll(200));
		expect(useFullscreenStore.getState().scroll).toBe(200);
	});

	it("partial update preserves other fields", () => {
		act(() => useFullscreenStore.getState().update({ image: "artist" }));
		act(() => useFullscreenStore.getState().onScroll(100));
		const state = useFullscreenStore.getState();
		expect(state.image).toBe("artist");
		expect(state.scroll).toBe(100);
	});
});
