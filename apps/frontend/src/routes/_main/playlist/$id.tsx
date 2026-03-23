import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { EntityPageHero } from "@/features/entities/page/entity-hero";
import { FooterModule } from "@/features/footer";
import { TracksTable } from "@/features/tracks/tracks-table";
import { tracksTableTransform } from "@/features/tracks/tracks-table/columns";
import { usePlaylistPage } from "@/hooks/query/use-playlist-page";
import { useDocumentTitle } from "@/hooks/use-document-title";

export const Route = createFileRoute("/_main/playlist/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: playlist } = usePlaylistPage();

	const title = useDocumentTitle();

	useEffect(() => {
		if (playlist?.name) title.set(playlist.name);
	}, [playlist?.name, title]);

	if (!playlist) return;

	return (
		<>
			<div className="pb-30">
				<EntityPageHero entity="playlist" data={playlist} />
				<div className="container mx-auto">
					<div className="px-6">
						<TracksTable
							entity="playlist"
							tracks={tracksTableTransform({
								tracks: playlist.tracks,
								entity: "playlist",
								entity_id: playlist._id,
							})}
						/>
					</div>
				</div>
			</div>

			<FooterModule />
		</>
	);
}
