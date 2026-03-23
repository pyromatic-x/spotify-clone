import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";
import { IoMdPause as PauseIcon, IoMdPlay as PlayIcon } from "react-icons/io";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { useChangeQueueMutation } from "@/hooks/mutations/use-change-queue-mutation";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import { cn } from "@/lib/utils";

const variants = cva("relative hover:scale-103 z-2 cursor-pointer", {
	variants: {
		variant: {
			primary:
				"flex items-center justify-center w-12 h-12 rounded-full [&_svg]:text-black [&_svg]:w-6 [&_svg]:h-6 bg-primary hover:bg-[#3be377] shadow-md shadow-black/70 [&_svg]:relative [&_[data-icon='play']]:left-0.5",
			white:
				"flex items-center justify-center w-8 h-8 rounded-full bg-white [&_svg]:fill-black [&_[data-icon='play']]:left-0.5 [&_svg]:relative",
			secondary: "p-2 [&_svg]:w-5 [&_svg]:h-5",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export const PlayButton = ({
	className,
	variant,
	track_id,
	entity_id,
	entity,
	...props
}: React.ComponentProps<"button"> & {
	track_id?: string;
	entity_id: string;
	entity: Exclude<TEntityTypes, "user">;
} & VariantProps<typeof variants> & {
		asChild?: boolean;
	}) => {
	const { isPlaying: isAudioPlaying, togglePlayPause } =
		useAudioPlayerContext();
	const source = useAudiobar((state) => state.source);
	const track = useAudiobar((state) => state.track);
	const change = useAudiobar((state) => state.change);

	const { mutate } = useChangeQueueMutation();

	const isSameSource = useMemo(
		() => source?._id === entity_id,
		[entity_id, source?._id],
	);
	const isCurrent = useMemo(
		() => track?._id === track_id,
		[track?._id, track_id],
	);
	const isPlaying = useMemo(
		() => isAudioPlaying && (isCurrent || (isSameSource && !track_id)),
		[isAudioPlaying, isSameSource, isCurrent, track_id],
	);

	const handleOnClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		event.stopPropagation();

		if (isCurrent || (isSameSource && !track_id)) {
			togglePlayPause();
		} else if (entity_id && !isSameSource) {
			mutate({ _id: entity_id, entity, track_id });
		} else if (track_id) {
			change(track_id);
		}
	};

	const Icon = isPlaying ? PauseIcon : PlayIcon;

	return (
		<button
			data-slot="button"
			onClick={handleOnClick}
			className={cn(variants({ variant, className }))}
			{...props}
		>
			<Icon data-icon={isPlaying ? "pause" : "play"} />
		</button>
	);
};
