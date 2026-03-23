import { describe, expect, it } from "vitest";
import { capitalizeFirstLetter } from "./strings";

describe("capitalizeFirstLetter", () => {
	it("capitalizes lowercase string", () => {
		expect(capitalizeFirstLetter("hello")).toBe("Hello");
	});

	it("keeps already capitalized string", () => {
		expect(capitalizeFirstLetter("Hello")).toBe("Hello");
	});

	it("handles single character", () => {
		expect(capitalizeFirstLetter("a")).toBe("A");
	});

	it("handles empty string", () => {
		expect(capitalizeFirstLetter("")).toBe("");
	});

	it("does not alter rest of string", () => {
		expect(capitalizeFirstLetter("hELLO WORLD")).toBe("HELLO WORLD");
	});
});
