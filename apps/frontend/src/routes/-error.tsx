import type { ErrorComponentProps } from "@tanstack/router-core";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export function ErrorPage({ reset }: ErrorComponentProps) {
	console.log(reset);
	return (
		<div className="w-full h-full flex flex-col gap-4 items-center justify-center">
			<AiOutlineExclamationCircle size={64} />
			<p className="text-4xl font-bold">Something went wrong while loading.</p>
			<p>Search for something else?</p>
		</div>
	);
}
