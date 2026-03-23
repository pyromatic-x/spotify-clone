import { describe, expect, it } from "vitest";
import { loginFormSchema } from "./schema";

describe("loginFormSchema", () => {
	it("validates correct input", () => {
		const result = loginFormSchema.safeParse({
			name: "user",
			password: "pass123",
			remember: true,
		});
		expect(result.success).toBe(true);
	});

	it("validates without optional remember field", () => {
		const result = loginFormSchema.safeParse({
			name: "user",
			password: "pass123",
		});
		expect(result.success).toBe(true);
	});

	it("rejects empty name", () => {
		const result = loginFormSchema.safeParse({
			name: "",
			password: "pass123",
		});
		expect(result.success).toBe(false);
	});

	it("rejects empty password", () => {
		const result = loginFormSchema.safeParse({
			name: "user",
			password: "",
		});
		expect(result.success).toBe(false);
	});

	it("rejects missing fields", () => {
		const result = loginFormSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});
