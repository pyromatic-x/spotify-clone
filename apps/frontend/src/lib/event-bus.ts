import type { TTrack } from "./api/schemas/track";

interface TEventsMap {
	"playback:track-changed": TTrack;
	"playback:play": TTrack;
	"playback:pause": TTrack;
	"playback:stop": TTrack;
	"entity-page:controls-scrolled": boolean;
	"scrollable:reset/{id}": { id: string };
}

type TEvents = keyof TEventsMap;
type TListeners = Partial<Record<TEvents, Array<(data: unknown) => void>>>;

class EventBusBase {
	private listeners: TListeners = {};

	emit<T extends TEvents>(event: T, data: TEventsMap[T]): void {
		const eventListeners = this.listeners[event];

		if (import.meta.env.DEV) {
			console.log(
				`EventBus: "${event}"\nListeners: ${eventListeners?.length || 0}\nData:`,
				data,
			);
		}

		if (eventListeners) {
			eventListeners.forEach((callback) => {
				callback(data);
			});
		}
	}

	subscribe<T extends TEvents>(
		event: T,
		callback: (data: TEventsMap[T]) => void,
	): () => void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback as (data: unknown) => void);

		return () => {
			this.listeners[event] = this.listeners[event]?.filter(
				(cb) => cb !== callback,
			);
		};
	}
}

export const EventBus = new EventBusBase();
