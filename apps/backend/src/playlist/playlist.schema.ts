import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ versionKey: false })
export class Playlist {
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	_id: ObjectId;

	@Prop()
	name: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	author: ObjectId;

	@Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
	made_for: ObjectId;

	@Prop({ required: false })
	description: string;

	@Prop({ type: String })
	type: "daily" | "mix";

	@Prop({ type: String })
	privacy: "public" | "private" | "likes";

	@Prop({ required: false })
	backdrop_url: string;

	@Prop()
	picture_url: string;

	@Prop({ required: false, type: Array })
	tracks: Array<{ _id: ObjectId; added_at: Date }>;

	@Prop()
	accent: string;

	@Prop()
	created_at: Date;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);

PlaylistSchema.index({ author: 1 });
PlaylistSchema.index({ privacy: 1 });
