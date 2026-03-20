import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { QUERY_KEY_ARTIST_PAGE } from "@/constants/queries";

export const useArtistPage = () => {
	const { id } = useParams({ from: "/_main/artist/$id" });

	return useQuery({
		queryKey: [QUERY_KEY_ARTIST_PAGE(id)],
		queryFn: () => HTTP.get("artist/{id}", { pathParams: { id } }),
		throwOnError: true,
	});
};
