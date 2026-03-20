import { create } from "zustand";
import type { SIDEBAR_SIZES } from "@/constants/sidebar";

type TLayers = {
	0: undefined | "now-playing";
	1: undefined | "queue" | "devices";
	2: undefined | "now-playing-fullscreen";
};

interface TStore {
	state: keyof typeof SIDEBAR_SIZES;
	layers: TLayers;

	scroll: number;
	hovered: boolean;

	toggle: <T extends keyof TLayers>(layer: T, component: TLayers[T]) => void;
	onScroll: (position: number) => void;
	onHover: (state: boolean) => void;

	_isClosed: (layers?: TStore["layers"]) => boolean;
}

export const useSidebarStore = create<TStore>((set, get) => ({
	state: "CLOSED",

	layers: {
		0: undefined,
		1: undefined,
		2: undefined,
	},

	scroll: 0,
	hovered: false,

	toggle: (layer, component) => {
		const { layers, _isClosed } = get();

		const copy: TStore["layers"] = JSON.parse(JSON.stringify(layers));

		copy[layer] = copy[layer] === component ? undefined : component;

		set({ layers: copy, state: _isClosed(copy) ? "CLOSED" : "OPENED" });
	},

	onScroll: (position) => set({ scroll: position }),
	onHover: (hovered) => {
		const updated: Partial<TStore> = { hovered };

		if (get()._isClosed()) updated.state = hovered ? "PREVIEW" : "CLOSED";

		set(updated);
	},

	_isClosed: (layers) => Object.values(layers || get().layers).every((t) => !t),
}));
