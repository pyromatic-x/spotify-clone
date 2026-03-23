import type { TEntityCard } from "./common";

export type TPersonal = Array<{
	category: string;
	title?: string;
	subtitle?: string;
	entities: Array<TEntityCard>;
}>;
