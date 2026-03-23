import { BadRequestException } from "@nestjs/common";
import { escapeRegex, generatePassword, shuffleArray, toObjectId } from "./utils";

describe("utils", () => {
	describe("toObjectId", () => {
		it("should convert valid string to ObjectId", () => {
			const id = "507f1f77bcf86cd799439011";
			const result = toObjectId(id);

			expect(String(result)).toBe(id);
		});

		it("should throw BadRequestException for invalid id", () => {
			expect(() => toObjectId("invalid")).toThrow(BadRequestException);
		});

		it("should throw BadRequestException for empty string", () => {
			expect(() => toObjectId("")).toThrow(BadRequestException);
		});
	});

	describe("escapeRegex", () => {
		it("should escape special regex characters", () => {
			const input = "test.*+?^${}()|[]\\";
			const result = escapeRegex(input);

			expect(result).toBe("test\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\");
		});

		it("should return plain string unchanged", () => {
			const input = "hello world";
			const result = escapeRegex(input);

			expect(result).toBe("hello world");
		});

		it("should handle empty string", () => {
			expect(escapeRegex("")).toBe("");
		});
	});

	describe("shuffleArray", () => {
		it("should keep the same elements", () => {
			const arr = [1, 2, 3, 4, 5];
			const copy = [...arr];
			shuffleArray(arr);

			expect(arr.sort()).toEqual(copy.sort());
		});

		it("should handle empty array", () => {
			const arr: number[] = [];
			shuffleArray(arr);

			expect(arr).toEqual([]);
		});

		it("should handle single element array", () => {
			const arr = [1];
			shuffleArray(arr);

			expect(arr).toEqual([1]);
		});
	});

	describe("generatePassword", () => {
		it("should generate password of default length 12", () => {
			const password = generatePassword();

			expect(password.length).toBe(12);
		});

		it("should generate password of specified length", () => {
			const password = generatePassword(20);

			expect(password.length).toBe(20);
		});

		it("should contain at least one lowercase letter", () => {
			const password = generatePassword();

			expect(password).toMatch(/[a-z]/);
		});

		it("should contain at least one uppercase letter", () => {
			const password = generatePassword();

			expect(password).toMatch(/[A-Z]/);
		});

		it("should contain at least one number", () => {
			const password = generatePassword();

			expect(password).toMatch(/[0-9]/);
		});

		it("should contain at least one special character", () => {
			const password = generatePassword();

			expect(password).toMatch(/[!@#$%^&*]/);
		});
	});
});
