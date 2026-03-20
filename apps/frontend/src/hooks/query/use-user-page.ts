import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { QUERY_KEY_USER_PAGE } from "@/constants/queries";

export const useUserPage = () => {
	const { id } = useParams({ from: "/_main/user/$id" });

	return useQuery({
		queryKey: [QUERY_KEY_USER_PAGE(id)],
		queryFn: () => HTTP.get("user/{id}", { pathParams: { id } }),
		throwOnError: true,
	});
};
