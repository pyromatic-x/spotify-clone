import type { TAuthPaylaod } from "../../schemas/auth";
import type { TEntityTypes } from "../../schemas/common";

export type TPostMethods = {
	"auth/login": {
		body: TAuthPaylaod;
		response: boolean;
	};
	"auth/logout": {
		response: boolean;
	};
	"follow/{type}/{id}": {
		pathParams: { type: TEntityTypes; id: string };
		response: boolean;
	};
};
