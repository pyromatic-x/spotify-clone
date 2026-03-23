/// <reference types="vitest/globals" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "@vitest/expect" {
	interface Assertion<T = unknown>
		extends TestingLibraryMatchers<
			ReturnType<typeof expect.stringContaining>,
			T
		> {}
	interface AsymmetricMatchersContaining
		extends TestingLibraryMatchers<unknown, unknown> {}
}
