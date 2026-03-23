import { render, screen } from "@testing-library/react";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "./empty";

describe("Empty", () => {
	it("renders with data-slot attribute", () => {
		render(<Empty data-testid="empty">content</Empty>);
		expect(screen.getByTestId("empty")).toHaveAttribute("data-slot", "empty");
	});

	it("renders children", () => {
		render(<Empty>No items found</Empty>);
		expect(screen.getByText("No items found")).toBeInTheDocument();
	});
});

describe("EmptyHeader", () => {
	it("renders with data-slot", () => {
		render(<EmptyHeader data-testid="eh">header</EmptyHeader>);
		expect(screen.getByTestId("eh")).toHaveAttribute(
			"data-slot",
			"empty-header",
		);
	});
});

describe("EmptyMedia", () => {
	it("renders default variant", () => {
		render(<EmptyMedia data-testid="em" />);
		expect(screen.getByTestId("em")).toHaveAttribute("data-variant", "default");
	});

	it("renders icon variant", () => {
		render(<EmptyMedia data-testid="em" variant="icon" />);
		expect(screen.getByTestId("em")).toHaveAttribute("data-variant", "icon");
	});
});

describe("EmptyTitle", () => {
	it("renders text", () => {
		render(<EmptyTitle>Title text</EmptyTitle>);
		expect(screen.getByText("Title text")).toBeInTheDocument();
	});
});

describe("EmptyDescription", () => {
	it("renders description", () => {
		render(<EmptyDescription>Some description</EmptyDescription>);
		expect(screen.getByText("Some description")).toBeInTheDocument();
	});
});

describe("EmptyContent", () => {
	it("renders children", () => {
		render(<EmptyContent>Content here</EmptyContent>);
		expect(screen.getByText("Content here")).toBeInTheDocument();
	});
});
