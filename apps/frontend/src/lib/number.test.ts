import { describe, expect, it } from "vitest";
import { toNumberWithDigits } from "./number";

describe("toNumberWithDigits", () => {
	it("returns empty string for NaN input", () => {
		expect(toNumberWithDigits("abc")).toBe("");
		expect(toNumberWithDigits("12a")).toBe("");
	});

	it("returns number as-is when less than 1000", () => {
		expect(toNumberWithDigits(999)).toBe("999");
		expect(toNumberWithDigits("42")).toBe("42");
	});

	it("adds comma by default for thousands", () => {
		expect(toNumberWithDigits(1000)).toBe("1,000");
		expect(toNumberWithDigits(1000000)).toBe("1,000,000");
		expect(toNumberWithDigits(123456789)).toBe("123,456,789");
	});

	it("uses dot divider when specified", () => {
		expect(toNumberWithDigits(1000, ".")).toBe("1.000");
		expect(toNumberWithDigits(1234567, ".")).toBe("1.234.567");
	});

	it("handles string input", () => {
		expect(toNumberWithDigits("50000")).toBe("50,000");
	});

	it("handles zero", () => {
		expect(toNumberWithDigits(0)).toBe("0");
	});
});
