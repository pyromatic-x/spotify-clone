import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_USER } from "@/constants/queries";

export const useUser = (enabled?: boolean) =>
	useQuery({
		queryKey: [QUERY_KEY_USER],
		queryFn: () => HTTP.get("user"),
		enabled,
	});
