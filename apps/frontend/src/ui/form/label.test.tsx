import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
	it("renders text", () => {
		render(<Label>Username</Label>);
		expect(screen.getByText("Username")).toBeInTheDocument();
	});

	it("has data-slot='label'", () => {
		render(<Label data-testid="lbl">Test</Label>);
		expect(screen.getByTestId("lbl")).toHaveAttribute("data-slot", "label");
	});

	it("applies custom className", () => {
		render(
			<Label data-testid="lbl" className="text-red-500">
				Red
			</Label>,
		);
		expect(screen.getByTestId("lbl").className).toContain("text-red-500");
	});
});
