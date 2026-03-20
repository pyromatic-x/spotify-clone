import { useParams } from "@tanstack/react-router";

export const SearchNoResults = () => {
	const { query } = useParams({ from: "/_main/search/$query/" });

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white">
			<h1 className="text-center font-bold text-2xl">
				No results found for "{query}"
			</h1>
			<p className="text-center">
				Please make sure your words are spelled correctly, or use fewer or
				different keywords.
			</p>
		</div>
	);
};
