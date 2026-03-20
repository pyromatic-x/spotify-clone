import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type LibraryDocument = HydratedDocument<Library>;

@Schema({ versionKey: false })
export class Library {
	_id: ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	user_id: ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	target_id: ObjectId;

	@Prop({ type: String })
	entity_type: "artist" | "playlist" | "album" | "user";

	@Prop()
	added_at: Date;

	@Prop({ required: false })
	last_played_at: Date;

	@Prop({ required: false })
	pinned_at?: Date;
}

export const LibrarySchema = SchemaFactory.createForClass(Library);

LibrarySchema.index({ user_id: 1, target_id: 1, entity_type: 1 }, { unique: true });
LibrarySchema.index({ target_id: 1, entity_type: 1 });
