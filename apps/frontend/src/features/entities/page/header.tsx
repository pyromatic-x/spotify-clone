import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import tinycolor from "tinycolor2";
import { ENTITY_PAGE_HEADER_PORTAL } from "@/constants/portals";
import { useMainStore } from "@/features/main/store";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import { EventBus } from "@/lib/event-bus";
import { cn } from "@/lib/utils";
import { PlayButton } from "@/ui/buttons/play-button";

interface TProps {
	_id: string;
	entity: TEntityTypes;
	name: string;
	accent: string;
}

export const EntityPageHeader = ({ _id, entity, name, accent }: TProps) => {
	const scroll = useMainStore((state) => state.scroll);

	const [isContentVisible, setIsContentVisible] = useState(false);

	const portal = document.getElementById(ENTITY_PAGE_HEADER_PORTAL);

	const backgroundOpacity = useMemo(() => {
		const targetHeight = 220;
		const clamped = Math.max(0, Math.min(scroll, targetHeight));
		const progress = clamped / targetHeight;

		return progress < 0.5
			? 2 * progress * progress
			: 1 - (-2 * progress + 2) ** 2 / 2;
	}, [scroll]);

	useEffect(() => {
		const unsubscribe = EventBus.subscribe(
			"entity-page:controls-scrolled",
			setIsContentVisible,
		);

		return () => {
			unsubscribe();
		};
	}, []);

	if (!portal) return;

	return createPortal(
		<div
			className={cn(
				"absolute top-0 z-1 w-full h-16",
				!isContentVisible && "pointer-events-none",
			)}
		>
			<div
				className="absolute top-0 -z-1 w-full h-full transition-opacity"
				style={{
					backgroundColor: tinycolor(accent).darken(15).toHexString(),
					opacity: backgroundOpacity,
				}}
			/>
			<div
				className={cn(
					"flex items-center gap-2 h-full container mx-auto px-4 transition-all duration-300",
					isContentVisible ? "opacity-100" : "opacity-0",
				)}
			>
				{entity !== "user" && <PlayButton entity_id={_id} entity={entity} />}
				<p className="text-[24px] font-bold text-white">{name}</p>
			</div>
		</div>,
		portal,
	);
};
