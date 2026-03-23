import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type TrackDocument = HydratedDocument<Track>;

@Schema({ versionKey: false })
export class Track {
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	_id: ObjectId;

	@Prop()
	name: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	author: ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	album: ObjectId;

	@Prop()
	duration: number;

	@Prop()
	audio_url: string;

	@Prop()
	explicit: boolean;

	@Prop()
	times_listened: string;

	@Prop({ type: String, required: false })
	lyrics: null;

	@Prop(
		raw([
			{
				performed_by: String,
				written_by: String,
				produced_by: String,
			},
		]),
	)
	credits: {
		performed_by: string;
		written_by: string;
		produced_by: string;
	};
}

export const TrackSchema = SchemaFactory.createForClass(Track);

TrackSchema.index({ author: 1 });
TrackSchema.index({ album: 1 });
