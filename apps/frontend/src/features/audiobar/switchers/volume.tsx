import { BsFillVolumeMuteFill as OffVolumeIcon } from "react-icons/bs";
import {
	IoVolumeHigh as HighVolumeIcon,
	IoVolumeLow as LowVolumeIcon,
	IoVolumeMedium as MediumVolumeIcon,
} from "react-icons/io5";
import { useAudioPlayerContext } from "react-use-audio-player";
import { IconButton } from "@/ui/buttons/icon-button";
import { Slider } from "@/ui/slider";

const Icon = (value: number, isMuted: boolean) => {
	if (!value || isMuted) return <OffVolumeIcon size="18px" />;

	if (value < 0.3) return <LowVolumeIcon size="18px" />;
	else if (value < 0.6) return <MediumVolumeIcon size="18px" />;
	return <HighVolumeIcon size="18px" />;
};

export const PlayerVolumeSwitch = () => {
	const { volume, setVolume, mute, unmute, isMuted } = useAudioPlayerContext();

	const handleOnChange = (value: number | number[]) => {
		const _value = Array.isArray(value) ? value[0] : value;
		setVolume(_value);
	};

	const handleOnIconClick = () => {
		if (!isMuted && volume === 0) setVolume(0.1);
		else if (isMuted) unmute();
		else if (!isMuted) mute();
	};

	return (
		<div className="flex items-center justify-center gap-3">
			<IconButton
				tooltip={isMuted || volume === 0 ? "Unmute" : "Mute"}
				onClick={handleOnIconClick}
				size="sm"
			>
				{Icon(volume, isMuted)}
			</IconButton>
			<Slider
				value={[isMuted ? 0 : volume]}
				step={0.01}
				max={1}
				onValueChange={handleOnChange}
				className="max-w-[90px] w-[5vw]"
			/>
		</div>
	);
};
