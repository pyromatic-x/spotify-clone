import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import { EventBus } from "@/lib/event-bus";

const Context = createContext<{
	get: () => string;
	set: (value: string) => void;
}>({
	get: () => "",
	set: () => {},
});

export const useDocumentTitle = () => useContext(Context);

export const DocumentTitleProvider = ({ children }: PropsWithChildren) => {
	const prev = useRef(document.title);
	const playing = useRef(false);

	useEffect(() => {
		const cleanup = [
			EventBus.subscribe("playback:play", (track) => {
				playing.current = true;
				document.title = `${track.name} • ${track.author.name}`;
			}),
			EventBus.subscribe("playback:pause", () => {
				document.title = prev.current;
				playing.current = false;
			}),
			EventBus.subscribe("playback:stop", () => {
				document.title = prev.current;
				playing.current = false;
			}),
		];

		return () => {
			cleanup.forEach((fn) => {
				fn();
			});
		};
	}, []);

	const get = useCallback(() => document.title, []);
	const set = useCallback((value: string) => {
		prev.current = `${value} | Spotify Showcase`;
		if (!playing.current) document.title = value;
	}, []);

	return <Context.Provider value={{ get, set }}>{children}</Context.Provider>;
};
