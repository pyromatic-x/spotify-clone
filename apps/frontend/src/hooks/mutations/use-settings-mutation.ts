import { HTTP } from "@http/client";
import { useMutation } from "@tanstack/react-query";
import type { DeepPartial } from "react-hook-form";
import { MUTATION_KEY_CHANGE_SETTINGS } from "@/constants/mutations";
import { QUERY_KEY_USER_SETTINGS } from "@/constants/queries";
import type { TUserSettings } from "@/lib/api/schemas/user";
import { queryClient } from "@/lib/query-client";

export const useSettingsMutation = () =>
	useMutation({
		mutationKey: [MUTATION_KEY_CHANGE_SETTINGS],
		mutationFn: (settings: DeepPartial<TUserSettings>) =>
			HTTP.put("settings", { body: settings }),
		onSuccess: (settings) => {
			queryClient.setQueryData([QUERY_KEY_USER_SETTINGS], settings);
		},
	});
