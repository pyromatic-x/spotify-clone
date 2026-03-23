import { render, screen } from "@testing-library/react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

describe("Table", () => {
	it("renders a table with data-slot", () => {
		render(
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>cell</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getByRole("table")).toHaveAttribute("data-slot", "table");
	});

	it("wraps table in a container div", () => {
		const { container } = render(
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>x</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(
			container.querySelector("[data-slot='table-container']"),
		).toBeInTheDocument();
	});
});

describe("TableHeader", () => {
	it("renders thead with data-slot", () => {
		const { container } = render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>x</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(
			container.querySelector("[data-slot='table-header']"),
		).toBeInTheDocument();
	});
});

describe("TableHead", () => {
	it("renders th with text", () => {
		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Column</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>x</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getByText("Column")).toBeInTheDocument();
	});
});

describe("TableRow / TableCell", () => {
	it("renders row and cell content", () => {
		render(
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Value A</TableCell>
						<TableCell>Value B</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getByText("Value A")).toBeInTheDocument();
		expect(screen.getByText("Value B")).toBeInTheDocument();
	});
});

describe("TableCaption", () => {
	it("renders caption text", () => {
		render(
			<Table>
				<TableCaption>My caption</TableCaption>
				<TableBody>
					<TableRow>
						<TableCell>x</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getByText("My caption")).toBeInTheDocument();
	});
});

describe("TableFooter", () => {
	it("renders tfoot with data-slot", () => {
		const { container } = render(
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>x</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
					</TableRow>
				</TableFooter>
			</Table>,
		);
		expect(
			container.querySelector("[data-slot='table-footer']"),
		).toBeInTheDocument();
	});
});
