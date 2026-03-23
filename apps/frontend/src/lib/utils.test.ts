import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("merges class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("handles conditional classes", () => {
		expect(cn("base", false && "hidden", "visible")).toBe("base visible");
	});

	it("resolves tailwind conflicts (last wins)", () => {
		const result = cn("p-4", "p-2");
		expect(result).toBe("p-2");
	});

	it("returns empty string with no args", () => {
		expect(cn()).toBe("");
	});

	it("handles undefined and null", () => {
		expect(cn("a", undefined, null, "b")).toBe("a b");
	});
});
