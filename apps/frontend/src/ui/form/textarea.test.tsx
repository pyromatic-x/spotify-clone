import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./textarea";

describe("Textarea", () => {
	it("renders a textarea element", () => {
		render(<Textarea placeholder="Write here" />);
		expect(screen.getByPlaceholderText("Write here")).toBeInTheDocument();
	});

	it("has data-slot='textarea'", () => {
		render(<Textarea placeholder="msg" />);
		expect(screen.getByPlaceholderText("msg")).toHaveAttribute(
			"data-slot",
			"textarea",
		);
	});

	it("accepts user input", async () => {
		render(<Textarea placeholder="msg" />);
		const ta = screen.getByPlaceholderText("msg");
		await userEvent.type(ta, "Hello world");
		expect(ta).toHaveValue("Hello world");
	});

	it("applies custom className", () => {
		render(<Textarea placeholder="msg" className="min-h-32" />);
		expect(screen.getByPlaceholderText("msg").className).toContain(
			"min-h-32",
		);
	});
});
