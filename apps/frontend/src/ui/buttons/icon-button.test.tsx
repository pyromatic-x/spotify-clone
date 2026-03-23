import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./icon-button";

describe("IconButton", () => {
	it("renders children", () => {
		render(<IconButton>X</IconButton>);
		expect(screen.getByText("X")).toBeInTheDocument();
	});

	it("has data-slot='button'", () => {
		render(<IconButton>X</IconButton>);
		expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
	});

	it("fires onClick", async () => {
		const onClick = vi.fn();
		render(<IconButton onClick={onClick}>X</IconButton>);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("shows active indicator when active=true", () => {
		const { container } = render(<IconButton active>X</IconButton>);
		const dot = container.querySelector(".bg-primary");
		expect(dot).toBeInTheDocument();
	});

	it("does not show active indicator when active=false", () => {
		const { container } = render(<IconButton active={false}>X</IconButton>);
		const dot = container.querySelector(
			".absolute.-bottom-0\\.5.bg-primary",
		);
		expect(dot).not.toBeInTheDocument();
	});
});
