import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model, ObjectId } from "mongoose";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import type { EntityTypes } from "src/types";
import { toObjectId } from "src/utils";
import type { LibraryEntity } from "./dto/library.dto";
import { Library } from "./library.schema";

@Injectable()
export class LibraryService {
	constructor(@InjectModel(Library.name) private model: Model<Library>) {}

	async getMany({
		query = {},
		limit = DEFAULT_QUERY_LIMIT,
	}: {
		query: Partial<Library>;
		limit?: number;
	}): Promise<Array<LibraryEntity>> {
		return this.model.aggregate([
			{
				$match: query,
			},
			{
				$lookup: {
					from: "users",
					localField: "target_id",
					foreignField: "_id",
					pipeline: [
						{
							$project: {
								_id: 1,
								name: 1,
								picture_url: 1,
							},
						},
					],
					as: "entity_user",
				},
			},
			{
				$lookup: {
					from: "artists",
					localField: "target_id",
					foreignField: "_id",
					pipeline: [
						{
							$project: {
								_id: 1,
								name: 1,
								picture_url: 1,
							},
						},
					],
					as: "entity_artist",
				},
			},
			{
				$lookup: {
					from: "albums",
					localField: "target_id",
					foreignField: "_id",
					pipeline: [
						{
							$lookup: {
								from: "artists",
								localField: "author",
								foreignField: "_id",
								pipeline: [
									{
										$project: {
											_id: 1,
											name: 1,
											type: 1,
										},
									},
								],
								as: "author",
							},
						},
						{
							$unwind: "$author",
						},
						{
							$addFields: {
								extra: {
									album_type: "$type",
								},
							},
						},
						{
							$project: {
								_id: 1,
								name: 1,
								picture_url: 1,
								author: 1,
								extra: 1,
							},
						},
					],
					as: "entity_album",
				},
			},
			{
				$lookup: {
					from: "playlists",
					localField: "target_id",
					foreignField: "_id",
					pipeline: [
						{
							$lookup: {
								from: "users",
								localField: "author",
								foreignField: "_id",
								pipeline: [
									{
										$project: {
											_id: 1,
											name: 1,
										},
									},
								],
								as: "author",
							},
						},
						{
							$unwind: "$author",
						},
						{
							$addFields: {
								extra: {
									tracks_count: {
										$size: "$tracks",
									},
								},
							},
						},
						{
							$project: {
								_id: 1,
								name: 1,
								picture_url: 1,
								author: 1,
								extra: 1,
							},
						},
					],
					as: "entity_playlist",
				},
			},
			{
				$limit: limit,
			},
			{
				$addFields: {
					entity: {
						$cond: {
							if: { $eq: [{ $size: "$entity_user" }, 1] },
							then: { $arrayElemAt: ["$entity_user", 0] },
							else: {
								$cond: {
									if: { $eq: [{ $size: "$entity_artist" }, 1] },
									then: { $arrayElemAt: ["$entity_artist", 0] },
									else: {
										$cond: {
											if: { $eq: [{ $size: "$entity_album" }, 1] },
											then: { $arrayElemAt: ["$entity_album", 0] },
											else: { $arrayElemAt: ["$entity_playlist", 0] },
										},
									},
								},
							},
						},
					},
				},
			},
			{
				$addFields: {
					is_collection: {
						$cond: [{ $eq: ["$entity.name", "Liked Songs"] }, true, false],
					},
				},
			},
			{
				$sort: {
					collection: -1,
					pinned_at: -1,
					added_at: -1,
				},
			},
			{
				$project: {
					_id: 1,
					entity: 1,
					entity_type: 1,
					added_at: 1,
					last_played_at: 1,
					pinned_at: 1,
					is_collection: 1,
				},
			},
		]);
	}

	async getCount({ query = {} }: { query: Partial<Library> }) {
		return this.model.countDocuments(query);
	}

	async toggleFollow(params: {
		target_id: ObjectId;
		type: EntityTypes;
		user_id: string;
	}) {
		const isFollowing = await this.isFollowing(params);

		const { target_id, type, user_id } = params;

		if (isFollowing) {
			await this.model.deleteOne({
				entity_type: type,
				target_id,
				user_id: toObjectId(user_id),
			});

			return false;
		} else {
			await this.model.create({
				added_at: new Date(),
				entity_type: type,
				target_id,
				user_id: toObjectId(user_id),
			});

			return true;
		}
	}

	async isFollowing({
		target_id,
		type,
		user_id,
	}: {
		target_id: ObjectId;
		type: EntityTypes;
		user_id: string;
	}) {
		return Boolean(
			await this.model.countDocuments({
				entity_type: type,
				target_id,
				user_id: toObjectId(user_id),
			}),
		);
	}
}
