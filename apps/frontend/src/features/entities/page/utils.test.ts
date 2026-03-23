import { describe, expect, it } from "vitest";
import { calcPageHeadingSize } from "./utils";

describe("calcPageHeadingSize", () => {
	it("returns max (96) for empty text", () => {
		expect(calcPageHeadingSize({ text: "", width: 800 })).toBe(96);
	});

	it("clamps to min (32) for very long text", () => {
		const longText = "a".repeat(200);
		expect(calcPageHeadingSize({ text: longText, width: 800 })).toBe(32);
	});

	it("clamps to max (96) for short text in wide container", () => {
		expect(calcPageHeadingSize({ text: "Hi", width: 2000 })).toBe(96);
	});

	it("calculates proportional size", () => {
		const result = calcPageHeadingSize({ text: "Hello World", width: 550 });
		expect(result).toBe(50);
	});

	it("returns min for narrow container", () => {
		expect(calcPageHeadingSize({ text: "Test Title", width: 100 })).toBe(32);
	});
});
