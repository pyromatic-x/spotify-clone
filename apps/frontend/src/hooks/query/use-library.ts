import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_LIBRARY } from "@/constants/queries";
import { useUser } from "./use-user";

export const useLibrary = () => {
	const { data: user } = useUser();

	return useQuery({
		queryKey: [QUERY_KEY_LIBRARY],
		queryFn: () => HTTP.get("library"),
		enabled: Boolean(user),
	});
};
