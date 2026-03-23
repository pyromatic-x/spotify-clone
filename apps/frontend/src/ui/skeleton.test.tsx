import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
	it("renders with data-slot attribute", () => {
		render(<Skeleton data-testid="skel" />);
		const el = screen.getByTestId("skel");
		expect(el).toHaveAttribute("data-slot", "skeleton");
	});

	it("applies custom className", () => {
		render(<Skeleton data-testid="skel" className="w-20 h-4" />);
		const el = screen.getByTestId("skel");
		expect(el.className).toContain("w-20");
		expect(el.className).toContain("h-4");
	});

	it("contains wave animation span", () => {
		const { container } = render(<Skeleton />);
		const span = container.querySelector("span.animate-wave");
		expect(span).toBeInTheDocument();
	});
});
