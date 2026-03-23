import { render } from "@testing-library/react";
import { EntityCardSkeleton } from "./entity-card-skeleton";

describe("EntityCardSkeleton", () => {
	it("renders 3 skeleton elements", () => {
		const { container } = render(<EntityCardSkeleton />);
		const skeletons = container.querySelectorAll("[data-slot='skeleton']");
		expect(skeletons).toHaveLength(3);
	});

	it("applies custom className", () => {
		const { container } = render(
			<EntityCardSkeleton className="custom-class" />,
		);
		expect(container.firstElementChild?.className).toContain("custom-class");
	});

	it("passes extra props to wrapper div", () => {
		const { container } = render(
			<EntityCardSkeleton data-testid="skel-card" />,
		);
		expect(
			container.querySelector("[data-testid='skel-card']"),
		).toBeInTheDocument();
	});
});
