import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_TRACK_NOW_PLAYING } from "@/constants/queries";
import { useAudiobar } from "@/features/audiobar/audiobar-store";

export const useNowPlaying = () => {
	const track = useAudiobar((state) => state.track);

	return useQuery({
		queryKey: [QUERY_KEY_TRACK_NOW_PLAYING(track?._id || "")],
		queryFn: () =>
			HTTP.get("track/{id}/now-playing", {
				pathParams: { id: track?._id as string },
			}),
		enabled: Boolean(track?._id),
	});
};
