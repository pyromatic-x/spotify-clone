import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect } from "react";
import { EntityPageHero } from "@/features/entities/page/entity-hero";
import { EntitiesRow } from "@/features/entities/row";
import { FooterModule } from "@/features/footer";
import { TracksTable } from "@/features/tracks/tracks-table";
import { tracksTableTransform } from "@/features/tracks/tracks-table/columns";
import { useAlbumPage } from "@/hooks/query/use-album-page";
import { useDocumentTitle } from "@/hooks/use-document-title";

export const Route = createFileRoute("/_main/album/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: album } = useAlbumPage();

	const title = useDocumentTitle();

	useEffect(() => {
		if (album?.name) title.set(album.name);
	}, [album?.name, title]);

	if (!album) return;

	return (
		<>
			<div className="pb-30 relative">
				<EntityPageHero entity="album" data={album} />

				<div className="container mx-auto">
					<div className="px-6">
						<TracksTable
							entity="album"
							tracks={tracksTableTransform({
								tracks: album.tracks,
								entity: "album",
								entity_id: album._id,
							})}
						/>

						<p className="my-10 text-sm text-[#b3b3b3]">
							{dayjs(album.released_at).format("MMMM DD, YYYY")}
						</p>

						<EntitiesRow
							entities={album.more_by_author}
							title={`More by ${album.author.name}`}
							link=""
							scrollable={false}
						/>
					</div>
				</div>
			</div>

			<FooterModule />
		</>
	);
}
