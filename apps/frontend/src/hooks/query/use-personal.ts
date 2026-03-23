import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_PERSONAL } from "@/constants/queries";

export const usePersonal = () =>
	useQuery({
		queryKey: [QUERY_KEY_PERSONAL],
		queryFn: () => HTTP.get("personal"),
	});
