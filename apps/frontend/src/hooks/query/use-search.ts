import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_SEARCH } from "@/constants/queries";

export const useSearch = ({ query }: { query: string }) =>
	useQuery({
		queryKey: [QUERY_KEY_SEARCH(query)],
		queryFn: () => {
			if (!query) return null;

			return HTTP.get("search", { searchParams: { query } });
		},
	});
