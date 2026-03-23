import { HTTP } from "@http/client";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY_LOGIN_AUTH } from "@/constants/mutations";
import type { TAuthPaylaod } from "@/lib/api/schemas/auth";
import type { TMutationConfig } from "./types";

const fn = (params: TAuthPaylaod) => HTTP.post("auth/login", { body: params });

export function useLoginMutation(config: TMutationConfig<typeof fn>) {
	return useMutation({
		...config,
		mutationKey: [MUTATION_KEY_LOGIN_AUTH],
		mutationFn: fn,
	});
}
