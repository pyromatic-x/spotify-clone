import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_QUEUE } from "@/constants/queries";
import { useUser } from "./use-user";

export const useQueue = () => {
	const { data: user } = useUser();

	return useQuery({
		queryKey: [QUERY_KEY_QUEUE],
		queryFn: () => HTTP.get("queue"),
		enabled: Boolean(user),
	});
};
