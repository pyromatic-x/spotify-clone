import { useMutation, useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { QUERY_KEY_LIBRARY } from "@/constants/queries";
import { HTTP } from "@/lib/api/http/client";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import { queryClient } from "@/lib/query-client";
import { Button } from "./button";

type TProps = ComponentProps<typeof Button> & {
	_id: string;
	entity: TEntityTypes;
	defaultState?: boolean;
};

export const FollowButton = ({
	_id,
	entity,
	defaultState,
	...rest
}: TProps) => {
	const queryKey = ["is-following", entity, _id];

	const { data } = useQuery({
		queryKey,
		queryFn: () =>
			HTTP.get("is-following/{type}/{id}", {
				pathParams: {
					type: entity,
					id: _id,
				},
			}),
		placeholderData: { following: defaultState ?? false },
	});

	const isFollowing = data?.following ?? defaultState;

	const { mutate } = useMutation({
		mutationFn: () =>
			HTTP.post("follow/{type}/{id}", {
				pathParams: {
					type: entity,
					id: _id,
				},
			}),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData(queryKey);
			queryClient.setQueryData(queryKey, { following: !isFollowing });
			return { previous };
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LIBRARY] });
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(queryKey, context?.previous);
		},
	});

	return (
		<Button
			variant="outlined"
			onClick={(e) => {
				e.stopPropagation();
				mutate();
			}}
			{...rest}
		>
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};
