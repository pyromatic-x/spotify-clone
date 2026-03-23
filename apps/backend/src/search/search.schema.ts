import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ versionKey: false })
export class Genre {
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	_id: ObjectId;

	@Prop()
	title: string;

	@Prop()
	color: string;

	@Prop()
	picture_url: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
