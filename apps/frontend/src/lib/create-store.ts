import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export function createStore<T>(
	storeCreator: StateCreator<T, [["zustand/immer", never]]>,
) {
	return create<T>()(
		devtools(immer(storeCreator), {
			enabled: import.meta.env.NODE_ENV === "development",
		}),
	);
}
