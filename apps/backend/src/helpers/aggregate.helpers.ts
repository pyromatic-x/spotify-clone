import type { PipelineStage } from "mongoose";
import { toObjectId } from "src/utils";

export function buildAuthorLookup(
	from: "artists" | "users",
	projectFields: Record<string, 1> = { _id: 1, name: 1, picture_url: 1 },
): PipelineStage[] {
	return [
		{
			$lookup: {
				from,
				localField: "author",
				foreignField: "_id",
				pipeline: [{ $project: projectFields }],
				as: "author",
			},
		},
		{ $unwind: "$author" as const },
	];
}

export function buildRandomSample(random?: number): PipelineStage[] {
	return random ? [{ $sample: { size: random } }] : [];
}

export function buildInLibraryLookup(userId: string): PipelineStage[] {
	return [
		{
			$lookup: {
				from: "library",
				let: { parentId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ["$target_id", "$$parentId"] },
									{ $eq: ["$user_id", toObjectId(userId)] },
								],
							},
						},
					},
					{ $limit: 1 },
					{ $project: { _id: 1 } },
				],
				as: "in_library",
			},
		},
		{
			$addFields: {
				in_library: {
					$cond: {
						if: { $gt: [{ $size: "$in_library" }, 0] },
						then: true,
						else: false,
					},
				},
			},
		},
	];
}
