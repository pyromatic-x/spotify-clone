import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { EntityPageHero } from "@/features/entities/page/entity-hero";
import { EntitiesRow } from "@/features/entities/row";
import { FooterModule } from "@/features/footer";
import { TracksTable } from "@/features/tracks/tracks-table";
import { tracksTableTransform } from "@/features/tracks/tracks-table/columns";
import { useArtistPage } from "@/hooks/query/use-artist-page";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { ArtistPageAbout } from "./-components/about";
import { ArtistPagePick } from "./-components/artist-pick";

export const Route = createFileRoute("/_main/artist/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: artist, isPending } = useArtistPage();

	const title = useDocumentTitle();

	useEffect(() => {
		if (artist?.name) title.set(artist.name);
	}, [artist?.name, title]);

	if (!artist || isPending) return;

	return (
		<>
			<div className="pb-30">
				<EntityPageHero entity="artist" data={artist} />
				<div className="mx-auto container">
					<div className="mt-6 mb-16 flex flex-row [@container_(max-width:1200px)]:flex-wrap">
						<div className="w-[70%] [@container_(max-width:1200px)]:w-full">
							<h2 className="text-[24px] font-bold text-white pl-6 mb-4">
								Popular
							</h2>
							<div className="px-6">
								<TracksTable
									entity="artist"
									header={false}
									cut={5}
									tracks={tracksTableTransform({
										tracks: artist.popular_tracks,
										entity: "artist",
										entity_id: artist._id,
									})}
								/>
							</div>
						</div>
						<ArtistPagePick />
					</div>

					<div className="flex flex-col gap-10 px-6">
						<EntitiesRow
							entities={artist.albums}
							title="Discography"
							link=""
							scrollable={false}
						/>
						<ArtistPageAbout />
						<EntitiesRow
							entities={artist.discovered_on_playlists}
							title="Discovered on"
							link=""
							scrollable={false}
						/>
						<EntitiesRow
							entities={artist.similar_artists}
							title="Fans also like"
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
