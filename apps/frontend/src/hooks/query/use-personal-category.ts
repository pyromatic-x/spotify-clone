import { HTTP } from "@http/client";
import { useQuery } from "@tanstack/react-query";

export const usePersonalCategories = (category: string) =>
	useQuery({
		queryKey: [`CATEGORY/${category}`],
		queryFn: () =>
			HTTP.get(`personal/{category}`, { pathParams: { category } }),
		throwOnError: true,
	});
