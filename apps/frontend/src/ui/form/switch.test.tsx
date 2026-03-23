import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./switch";

describe("Switch", () => {
	it("renders with data-slot='switch'", () => {
		render(<Switch aria-label="toggle" />);
		const sw = screen.getByRole("switch");
		expect(sw).toHaveAttribute("data-slot", "switch");
	});

	it("starts unchecked by default", () => {
		render(<Switch aria-label="toggle" />);
		expect(screen.getByRole("switch")).toHaveAttribute(
			"data-state",
			"unchecked",
		);
	});

	it("toggles on click", async () => {
		render(<Switch aria-label="toggle" />);
		const sw = screen.getByRole("switch");

		await userEvent.click(sw);
		expect(sw).toHaveAttribute("data-state", "checked");

		await userEvent.click(sw);
		expect(sw).toHaveAttribute("data-state", "unchecked");
	});

	it("renders thumb element", () => {
		const { container } = render(<Switch aria-label="toggle" />);
		expect(
			container.querySelector("[data-slot='switch-thumb']"),
		).toBeInTheDocument();
	});
});
