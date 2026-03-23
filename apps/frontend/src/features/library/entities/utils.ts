import type { TLibraryEntity } from "@/lib/api/schemas/library";
import { capitalizeFirstLetter } from "@/lib/strings";
import type { TLibraryStore } from "../store";

export const getLibraryEntityDescription = ({
	category,
	entity,
}: {
	category: TLibraryStore["category"];
	entity: TLibraryEntity;
}) => {
	let title = "";
	let subtitle = "";

	const type = entity.entity_type;
	const extra = entity.entity.extra;
	const author = "author" in entity.entity ? entity.entity.author : null;

	if (!category) {
		title = capitalizeFirstLetter(type);

		if (extra?.album_type) {
			title = capitalizeFirstLetter(extra.album_type);
			subtitle = author?.name || "";
		}
		if (extra?.tracks_count) {
			if (entity.pinned_at) subtitle = `${extra.tracks_count} songs`;
			else if (author) subtitle = author.name;
		}
	}

	if (category === "album") {
		if (extra?.album_type !== "album") {
			title = capitalizeFirstLetter(extra?.album_type || "");
			subtitle = author?.name || "";
		} else {
			title = author?.name || "";
		}
	}

	if (category.includes("playlist")) {
		title = author?.name || "";

		if (extra?.is_collection && extra?.tracks_count) {
			title = `${extra.tracks_count} songs`;
		}
	}

	return { title, subtitle };
};
