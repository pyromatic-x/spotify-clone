import {
	buildAuthorLookup,
	buildInLibraryLookup,
	buildRandomSample,
} from "./aggregate.helpers";

describe("aggregate helpers", () => {
	describe("buildAuthorLookup", () => {
		it("should return lookup and unwind stages", () => {
			const stages = buildAuthorLookup("artists");

			expect(stages).toHaveLength(2);
			expect(stages[0]).toHaveProperty("$lookup");
			expect((stages[0] as any).$lookup.from).toBe("artists");
			expect(stages[1]).toHaveProperty("$unwind");
		});

		it("should use custom project fields", () => {
			const stages = buildAuthorLookup("users", { _id: 1, name: 1 });

			const pipeline = (stages[0] as any).$lookup.pipeline;
			expect(pipeline[0].$project).toEqual({ _id: 1, name: 1 });
		});

		it("should use default project fields", () => {
			const stages = buildAuthorLookup("artists");

			const pipeline = (stages[0] as any).$lookup.pipeline;
			expect(pipeline[0].$project).toEqual({
				_id: 1,
				name: 1,
				picture_url: 1,
			});
		});
	});

	describe("buildRandomSample", () => {
		it("should return sample stage when random is provided", () => {
			const stages = buildRandomSample(5);

			expect(stages).toHaveLength(1);
			expect((stages[0] as any).$sample.size).toBe(5);
		});

		it("should return empty array when random is undefined", () => {
			const stages = buildRandomSample(undefined);

			expect(stages).toEqual([]);
		});

		it("should return empty array when random is 0", () => {
			const stages = buildRandomSample(0);

			expect(stages).toEqual([]);
		});
	});

	describe("buildInLibraryLookup", () => {
		it("should return lookup and addFields stages", () => {
			const stages = buildInLibraryLookup("507f1f77bcf86cd799439011");

			expect(stages).toHaveLength(2);
			expect(stages[0]).toHaveProperty("$lookup");
			expect((stages[0] as any).$lookup.from).toBe("library");
			expect(stages[1]).toHaveProperty("$addFields");
		});
	});
});
