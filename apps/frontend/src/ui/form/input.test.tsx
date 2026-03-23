import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
	it("renders an input element", () => {
		render(<Input placeholder="Email" />);
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
	});

	it("has data-slot='input'", () => {
		render(<Input placeholder="test" />);
		expect(screen.getByPlaceholderText("test")).toHaveAttribute(
			"data-slot",
			"input",
		);
	});

	it("accepts text input", async () => {
		render(<Input placeholder="Name" />);
		const input = screen.getByPlaceholderText("Name");
		await userEvent.type(input, "hello");
		expect(input).toHaveValue("hello");
	});

	it("renders password toggle button for type=password", () => {
		render(<Input type="password" placeholder="Password" />);
		expect(
			screen.getByLabelText("toggle password visibility"),
		).toBeInTheDocument();
	});

	it("does not render toggle for type=text", () => {
		render(<Input type="text" placeholder="Text" />);
		expect(
			screen.queryByLabelText("toggle password visibility"),
		).not.toBeInTheDocument();
	});

	it("toggles password visibility on click", async () => {
		render(<Input type="password" placeholder="Password" />);
		const input = screen.getByPlaceholderText("Password");
		const toggle = screen.getByLabelText("toggle password visibility");

		expect(input).toHaveAttribute("type", "password");

		await userEvent.click(toggle);
		expect(input).toHaveAttribute("type", "text");

		await userEvent.click(toggle);
		expect(input).toHaveAttribute("type", "password");
	});
});
