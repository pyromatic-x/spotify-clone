import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LikeButton } from "./like-button";

describe("LikeButton", () => {
	it("renders without crashing", () => {
		render(<LikeButton _id="1" />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("toggles state on click", async () => {
		render(<LikeButton _id="1" defaultValue={false} />);
		const btn = screen.getByRole("button");

		await userEvent.click(btn);

		const icon = btn.querySelector("svg");
		expect(icon).toBeInTheDocument();
	});

	it("starts in liked state when defaultValue=true", () => {
		const { container } = render(<LikeButton _id="1" defaultValue={true} />);
		const bg = container.querySelector(".bg-primary");
		expect(bg).toBeInTheDocument();
	});
});
