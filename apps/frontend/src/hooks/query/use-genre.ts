import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_GENRE_PAGE } from "@/constants/queries";

export const useGenre = (id: string) =>
	useQuery({
		queryKey: [QUERY_KEY_GENRE_PAGE(id)],
		queryFn: () => HTTP.get(`genres/{id}`, { pathParams: { id } }),
		throwOnError: true,
	});
