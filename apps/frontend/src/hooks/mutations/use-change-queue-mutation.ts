import { HTTP } from "@http/client";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY_CHANGE_QUEUE } from "@/constants/mutations";
import { QUERY_KEY_QUEUE } from "@/constants/queries";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TChangeQueuePayload } from "@/lib/api/schemas/queue";
import { queryClient } from "@/lib/query-client";

export function useChangeQueueMutation() {
	return useMutation({
		mutationKey: [MUTATION_KEY_CHANGE_QUEUE],
		mutationFn: (params: TChangeQueuePayload) =>
			HTTP.put("queue", { body: params }),
		onSuccess: (updated) => {
			queryClient.setQueryData([QUERY_KEY_QUEUE], updated);

			if (updated.track_id) {
				useAudiobar.getState().change(updated.track_id);
			}
		},
	});
}
