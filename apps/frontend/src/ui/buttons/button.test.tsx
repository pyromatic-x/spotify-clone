import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("has data-slot='button'", () => {
		render(<Button>Test</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
	});

	it("fires onClick", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click</Button>);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("shows loader when loading=true", () => {
		render(<Button loading>Submit</Button>);
		const svg = screen.getByRole("button").querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(screen.queryByText("Submit")).not.toBeInTheDocument();
	});

	it("renders children when loading=false", () => {
		render(<Button loading={false}>Submit</Button>);
		expect(screen.getByText("Submit")).toBeInTheDocument();
	});

	it("applies disabled attribute", () => {
		render(<Button disabled>Nope</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});
});
