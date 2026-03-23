import { useEffect, useState } from "react";
import { useLibraryStore } from "./store";

export const LibrarySearchNothingFound = () => {
	const { search } = useLibraryStore();
	const [value, setValue] = useState(search);

	useEffect(() => {
		if (search.length > 15) {
			setValue(`${search.slice(0, 18)}...`);
			return;
		}

		setValue(search);
	}, [search]);

	return (
		<div className="h-full flex flex-col items-center justify-center text-center">
			<p className="font-bold">{`Couldn't find “${value}”`}</p>
			<p className="mb-40">
				Try searching again using a different spelling or keyword.
			</p>
		</div>
	);
};
