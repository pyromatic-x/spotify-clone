import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { APP_PORTAL } from "@/constants/portals";
import { cn } from "@/lib/utils";
import { Scrollable, type ScrollableRef } from "@/ui/scrollable";
import { useSidebarStore } from "../../store";
import { useFullscreenStore } from "../store";
import { NowPlayingFullscreenHeader } from "./header";
import { NowPlayingFullscreenImage } from "./image";
import { NowPlayingFullscreenInfo } from "./info";

export const NowPlayingFullscreen = () => {
	const router = useRouter();

	const ref = useRef<ScrollableRef>(null);

	const layers = useSidebarStore((state) => state.layers);
	const toggle = useSidebarStore((state) => state.toggle);
	const onScroll = useFullscreenStore((state) => state.onScroll);
	const image = useFullscreenStore((state) => state.image);

	const portal = document.getElementById(APP_PORTAL);

	useEffect(() => {
		const unsubscribe = router.subscribe("onBeforeNavigate", () => {
			if (layers[2] === "now-playing-fullscreen") {
				toggle(2, "now-playing-fullscreen");
				ref.current?.reset();
			}
		});

		return () => unsubscribe();
	}, [router, layers[2], toggle]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: on mount
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape" || e.code === "Escape") {
				toggle(2, "now-playing-fullscreen");
				ref.current?.reset();
			}
		};

		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, []);

	if (!portal) return;

	return createPortal(
		<Scrollable
			ref={ref}
			onScroll={onScroll}
			className={cn([
				"relative w-[calc(100%)] bg-[#121212] h-full col-[library/sidebar] row-[library/sidebar] z-30 transition-all ease-in-out duration-500 rounded-[8px] overflow-hidden",
				image === "artist" ? "pb-60" : "pb-20",
				layers[2] !== "now-playing-fullscreen"
					? "translate-x-[105%]"
					: "translate-x-0",
			])}
		>
			<NowPlayingFullscreenHeader
				onResetScroll={(delay) => ref.current?.reset(delay)}
			/>
			<NowPlayingFullscreenImage />
			<NowPlayingFullscreenInfo />
		</Scrollable>,

		portal,
	);
};
