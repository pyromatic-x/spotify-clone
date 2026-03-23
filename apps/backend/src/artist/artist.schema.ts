import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ versionKey: false })
export class Artist {
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	_id: ObjectId;

	@Prop()
	name: string;

	@Prop()
	backdrop_url: string;

	@Prop()
	picture_url: string;

	@Prop()
	page_accent: string;

	@Prop()
	verified: boolean;

	@Prop(
		raw([
			{
				text: String,
				picture_url: String,
				author: String,
			},
		]),
	)
	about: {
		text: string;
		picture_url: string;
		author: string;
	};

	@Prop(
		raw([
			{
				monthly: String,
				world: Array,
			},
		]),
	)
	listeners: {
		monthly: string;
		world: Array<{ city: string; value: string }>;
	};

	@Prop()
	links: Array<{ platform: string; username: string }>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
