export const createArrayWithRandoms = (length: number) =>
	Array.from({ length }).map(() => crypto.randomUUID());
