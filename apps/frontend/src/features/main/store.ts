import { create } from "zustand";
import { LIBRARY_SIZES } from "@/constants/library";

interface TStore {
	width: number;
	scroll: number;
	accent: string;

	update: (payload: Partial<Omit<TStore, "update">>) => void;
}

export const useMainStore = create<TStore>((set) => ({
	width: window.innerWidth - Number(LIBRARY_SIZES.DEFAULT.slice(0, -2)),
	scroll: 0,
	accent: "",

	update: (payload) => set((state) => ({ ...state, ...payload })),
}));
