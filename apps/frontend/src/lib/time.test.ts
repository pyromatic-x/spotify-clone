import { describe, expect, it } from "vitest";
import { formatDuration } from "./time";

describe("formatDuration", () => {
	it("returns -:-- for undefined", () => {
		expect(formatDuration(undefined)).toBe("-:--");
	});

	it("returns -:-- for null-ish values", () => {
		expect(formatDuration()).toBe("-:--");
	});

	it("formats 0 seconds", () => {
		expect(formatDuration(0)).toBe("0:00");
	});

	it("pads seconds less than 10", () => {
		expect(formatDuration(5)).toBe("0:05");
		expect(formatDuration(9)).toBe("0:09");
	});

	it("formats exact minute", () => {
		expect(formatDuration(60)).toBe("1:00");
		expect(formatDuration(120)).toBe("2:00");
	});

	it("formats minutes and seconds", () => {
		expect(formatDuration(90)).toBe("1:30");
		expect(formatDuration(185)).toBe("3:05");
		expect(formatDuration(3661)).toBe("61:01");
	});

	it("floors fractional seconds", () => {
		expect(formatDuration(61.9)).toBe("1:01");
	});
});
