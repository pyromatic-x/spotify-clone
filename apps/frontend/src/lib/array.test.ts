import { describe, expect, it } from "vitest";
import { createArrayWithRandoms } from "./array";

describe("createArrayWithRandoms", () => {
	it("creates an array of the given length", () => {
		expect(createArrayWithRandoms(5)).toHaveLength(5);
		expect(createArrayWithRandoms(0)).toHaveLength(0);
	});

	it("fills array with unique UUIDs", () => {
		const arr = createArrayWithRandoms(10);
		const unique = new Set(arr);
		expect(unique.size).toBe(10);
	});

	it("each element is a valid UUID string", () => {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		const arr = createArrayWithRandoms(3);
		for (const id of arr) {
			expect(id).toMatch(uuidRegex);
		}
	});
});
