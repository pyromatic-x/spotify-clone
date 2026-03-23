import { render } from "@testing-library/react";
import { LibraryModuleSkeleton } from "./skeleton";

describe("LibraryModuleSkeleton", () => {
	it("renders 20 skeleton rows", () => {
		const { container } = render(<LibraryModuleSkeleton />);
		const rows = container.querySelectorAll("[data-slot='skeleton']");
		expect(rows.length).toBe(40); // 2 skeletons per row * 20 rows
	});
});
