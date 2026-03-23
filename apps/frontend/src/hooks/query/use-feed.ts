import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY_FEED } from "@/constants/queries";
import { HTTP } from "@/lib/api/http/client";

export const useFeed = () =>
	useInfiniteQuery({
		queryKey: [QUERY_KEY_FEED],
		queryFn: ({ pageParam }) =>
			HTTP.get("feed", {
				searchParams: {
					page: pageParam,
				},
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (!lastPage?.has_more) return null;
			return (lastPage?.page || 1) + 1;
		},
	});
