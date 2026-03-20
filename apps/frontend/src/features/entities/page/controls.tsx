import { useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import { PiShuffle as ShuffleIcon } from "react-icons/pi";
import { useMainStore } from "@/features/main/store";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import { EventBus } from "@/lib/event-bus";
import { FollowButton } from "@/ui/buttons/follow-button";
import { IconButton } from "@/ui/buttons/icon-button";
import { LikeButton } from "@/ui/buttons/like-button";
import { PlayButton } from "@/ui/buttons/play-button";

interface TProps {
	_id: string;
	name: string;
	entity: Exclude<TEntityTypes, "user">;
	in_library?: boolean;
}

export const EntityPageControls = ({
	_id,
	entity,
	name,
	in_library,
}: TProps) => {
	const scroll = useMainStore((state) => state.scroll);
	const ref = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: skip
	useEffect(() => {
		if (ref.current) {
			const { top } = ref.current.getBoundingClientRect();
			const height = ref.current.clientHeight;
			EventBus.emit("entity-page:controls-scrolled", top - height * 1.5 < 0);
		}
	}, [scroll]);

	return (
		<div className="container mx-auto px-6 pt-6">
			<div className="flex items-center gap-6 text-[#b3b3b3]" ref={ref}>
				<PlayButton entity_id={_id} entity={entity} className="size-14" />
				<IconButton
					tooltip={`Enable Shuffle for ${name}`}
					size="auto"
					className="size-10"
				>
					<ShuffleIcon />
				</IconButton>
				{entity !== "artist" ? (
					<LikeButton _id={_id} size="lg" defaultValue={in_library} />
				) : (
					<FollowButton _id={_id} entity={entity} />
				)}
				{in_library && (
					<IconButton
						size="auto"
						className="size-7 p-1 rounded-full border-2 border-[#b3b3b3]"
					>
						<FaArrowDown />
					</IconButton>
				)}
				<IconButton
					tooltip={`More options for ${name}`}
					size="auto"
					className="size-7"
				>
					<BsThreeDots />
				</IconButton>
			</div>
		</div>
	);
};
