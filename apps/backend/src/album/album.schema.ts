import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type AlbumDocument = HydratedDocument<Album>;

@Schema({ versionKey: false })
export class Album {
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	_id: ObjectId;

	@Prop()
	name: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	author: ObjectId;

	@Prop()
	picture_url: string;

	@Prop()
	released_at: Date;

	@Prop({ required: false, type: Array })
	tracks: Array<ObjectId>;

	@Prop({ required: false })
	accent: string;

	@Prop({ required: false, type: String })
	type: string;

	@Prop({ required: false })
	description: string;

	@Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
	made_for: ObjectId;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);

AlbumSchema.index({ author: 1 });
