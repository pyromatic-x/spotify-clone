import type { DeepPartial } from "react-hook-form";
import type { TChangeQueuePayload, TQueue } from "../../schemas/queue";
import type { TUserSettings } from "../../schemas/user";

export type TPutMethods = {
	queue: {
		body: TChangeQueuePayload;
		response: TQueue;
	};
	settings: {
		body: DeepPartial<TUserSettings>;
		response: TUserSettings;
	};
};
