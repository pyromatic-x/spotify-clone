import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { QUERY_KEY_PLAYLIST_PAGE } from "@/constants/queries";

export const usePlaylistPage = () => {
	const { id } = useParams({ from: "/_main/playlist/$id" });

	return useQuery({
		queryKey: [QUERY_KEY_PLAYLIST_PAGE(id)],
		queryFn: () => HTTP.get("playlist/{id}", { pathParams: { id } }),
		throwOnError: true,
	});
};
