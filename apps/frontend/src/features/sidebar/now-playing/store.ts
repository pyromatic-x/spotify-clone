import { create } from "zustand";

interface TVariables {
	scroll: number;
	image: "artwork" | "artist";
}

interface TMethods {
	update: (params: Partial<TVariables>) => void;
	onScroll: (position: number) => void;
}

export const useFullscreenStore = create<TVariables & TMethods>((set) => ({
	scroll: 0,
	image: "artwork",

	update: (payload) =>
		set((state) => ({
			...state,
			...payload,
		})),
	onScroll: (position) => set({ scroll: position }),
}));
