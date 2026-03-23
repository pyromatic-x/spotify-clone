import type { PropsWithChildren } from "react";
import { MAIN_SCROLLABLE_CONTAINER } from "@/constants/dom-ids";
import { ENTITY_PAGE_HEADER_PORTAL } from "@/constants/portals";
import { Scrollable } from "@/ui/scrollable";
import { useMainStore } from "./store";

export const MainModule = ({ children }: PropsWithChildren) => {
	const update = useMainStore((s) => s.update);

	return (
		<div className="relative flex [grid-area:main] [container-name:main] @container-[size] rounded-md overflow-hidden">
			<div id={ENTITY_PAGE_HEADER_PORTAL} />
			<Scrollable
				id={MAIN_SCROLLABLE_CONTAINER}
				className="w-full relative bg-[#121212]"
				onScroll={(scroll) => update({ scroll })}
				onResize={({ width }) => update({ width })}
				resetOnRouteChange
			>
				{children}
			</Scrollable>
		</div>
	);
};
