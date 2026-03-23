import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_USER_SETTINGS } from "@/constants/queries";

export const useSettings = (enabled?: boolean) =>
	useQuery({
		queryKey: [QUERY_KEY_USER_SETTINGS],
		queryFn: () => HTTP.get("settings"),
		enabled,
	});
