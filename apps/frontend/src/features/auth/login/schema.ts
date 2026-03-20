import { z } from "zod";

export const loginFormSchema = z.object({
	name: z.string().nonempty("Required field"),
	password: z.string().nonempty("Required field"),
	remember: z.boolean().optional(),
});

export type TLoginFormFields = z.infer<typeof loginFormSchema>;
