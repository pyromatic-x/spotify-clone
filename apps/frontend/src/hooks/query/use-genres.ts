import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_GENRES } from "@/constants/queries";

export const useGenres = () =>
	useQuery({
		queryKey: [QUERY_KEY_GENRES],
		queryFn: () => HTTP.get("genres"),
	});
