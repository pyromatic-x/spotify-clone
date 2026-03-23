import { HTTP } from "@http/client";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY_LOGOUT_AUTH } from "@/constants/mutations";
import type { TMutationConfig } from "./types";

const fn = () => HTTP.post("auth/logout", {});

export function useLogoutMutation(config: TMutationConfig<typeof fn>) {
	return useMutation({
		...config,
		mutationKey: [MUTATION_KEY_LOGOUT_AUTH],
		mutationFn: fn,
	});
}
