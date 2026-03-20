import type { TQueue } from "@/lib/api/schemas/queue";
import type { TTrack } from "@/lib/api/schemas/track";
import { createStore } from "@/lib/create-store";
import { EventBus } from "@/lib/event-bus";

interface TStore {
	source: TQueue["source"];
	tracks: TQueue["tracks"];
	track: TTrack | null;
	shuffle: boolean;
	repeat: boolean;

	init: (queue: TQueue) => void;
	toggle: (payload: "shuffle" | "repeat") => void;
	next: () => void;
	prev: () => void;
	change: (_id: string) => void;
}

export const useAudiobar = createStore<TStore>((set, get) => ({
	source: {} as TStore["source"],
	tracks: [],
	track: null,
	shuffle: false,
	repeat: false,

	init: (queue) => {
		const track = queue.track_id ? queue.track_id : queue.tracks[0]._id;

		set({ ...queue });
		get().change(track);
	},

	toggle: (payload) =>
		set((state) => {
			const shuffle = payload === "shuffle" ? !state.shuffle : state.shuffle;
			const repeat = payload === "repeat" ? !state.repeat : state.repeat;

			return { ...state, shuffle, repeat };
		}),

	next: () => {
		const { track, tracks } = get();

		if (!track || !tracks) return;

		const idx = tracks.findIndex((t) => t?._id === track._id);

		if (idx !== -1) {
			const next = tracks[idx + 1] || tracks[0];

			set({ track: next });
			EventBus.emit("playback:track-changed", track);
		}
	},

	prev: () => {
		const { track, tracks } = get();

		if (!track || !tracks) return;

		const idx = tracks.findIndex((t) => t?._id === track._id);

		if (idx !== -1) {
			const prev = tracks[idx - 1] || tracks[tracks.length - 1];

			set({ track: prev });
			EventBus.emit("playback:track-changed", prev);
		}
	},

	change: (_id) => {
		const { tracks } = get();

		if (!tracks?.length) return;

		const idx = tracks.findIndex((t) => t._id === _id);

		if (idx !== -1) {
			set({ track: tracks[idx] });
			EventBus.emit("playback:track-changed", tracks[idx]);
		}
	},
}));
