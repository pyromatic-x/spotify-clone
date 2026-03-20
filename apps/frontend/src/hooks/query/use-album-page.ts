import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { QUERY_KEY_ALBUM_PAGE } from "@/constants/queries";

export const useAlbumPage = () => {
	const { id } = useParams({ from: "/_main/album/$id" });

	return useQuery({
		queryKey: [QUERY_KEY_ALBUM_PAGE(id)],
		queryFn: () => HTTP.get("album/{id}", { pathParams: { id } }),
		throwOnError: true,
	});
};
