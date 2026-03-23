import { BadRequestException } from "@nestjs/common";
import { ParseObjectIdPipe } from "./parse-object-id.pipe";

describe("ParseObjectIdPipe", () => {
	let pipe: ParseObjectIdPipe;

	beforeEach(() => {
		pipe = new ParseObjectIdPipe();
	});

	it("should return the value for a valid ObjectId", () => {
		const validId = "507f1f77bcf86cd799439011";

		const result = pipe.transform(validId, { type: "param" } as any);

		expect(result).toBe(validId);
	});

	it("should throw BadRequestException for an invalid ObjectId", () => {
		expect(() =>
			pipe.transform("invalid-id", { type: "param" } as any),
		).toThrow(BadRequestException);
	});

	it("should throw BadRequestException for an empty string", () => {
		expect(() => pipe.transform("", { type: "param" } as any)).toThrow(
			BadRequestException,
		);
	});
});
