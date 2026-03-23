import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { type HydratedDocument, type ObjectId } from "mongoose";

export type UserDocument = HydratedDocument<User>;

const SettingsSchema = new mongoose.Schema(
	{
		language: String,
		quality: {
			streaming: String,
			normalize: Boolean,
		},
		library: {
			compact: Boolean,
		},
		display: {
			show_now_playing: Boolean,
			show_canvas: Boolean,
		},
		social: {
			show_playlists: Boolean,
			show_following: Boolean,
			share_activity: Boolean,
		},
	},
	{ _id: false },
);

@Schema({ versionKey: false })
export class User {
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	_id: ObjectId;

	@Prop()
	name: string;

	@Prop()
	picture_url: string;

	@Prop({ select: false })
	password?: string;

	@Prop(
		raw([
			{
				_id: String,
				name: String,
				type: String,
			},
		]),
	)
	devices: {
		_id: ObjectId;
		name: string;
		type: "Android" | "iPhone" | "iPad" | "Mac" | "Windows";
	};

	@Prop(
		raw([
			{
				_id: false,
				active_track_id: mongoose.Schema.Types.ObjectId,
				source: {
					_id: String,
					entity: String,
					name: String,
				},
				tracks: Array,
			},
		]),
	)
	queue: {
		source: {
			_id: ObjectId;
			entity: "artist" | "playlist" | "album";
			name: string;
		};
		tracks: Array<ObjectId>;
	};

	@Prop(
		raw([
			{
				_id: false,
				active_track_id: String,
				time: Number,
				volume: Number,
				shuffle: String,
				repeat: String,
				status: String,
				device: String,
			},
		]),
	)
	playback: {
		active_track_id: ObjectId | null;
		time: number;
		volume: number;
		shuffle: "off" | "on";
		repeat: "off" | "on" | "track";
		status: "playing" | "paused";
		device: ObjectId;
	};

	@Prop({ type: SettingsSchema })
	settings: {
		language: "en";
		quality: {
			streaming: "auto";
			normalize: boolean;
		};
		library: {
			compact: boolean;
		};
		display: {
			show_now_playing: boolean;
			show_canvas: boolean;
		};
		social: {
			show_playlists: boolean;
			show_following: boolean;
			share_activity: boolean;
		};
	};
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ name: 1 }, { unique: true });
