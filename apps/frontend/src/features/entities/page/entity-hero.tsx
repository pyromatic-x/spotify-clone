import { Link } from "@tanstack/react-router";
import { useState } from "react";
import tinycolor from "tinycolor2";
import { useMainStore } from "@/features/main/store";
import type { TAlbumPage } from "@/lib/api/schemas/album";
import type { TArtistPage } from "@/lib/api/schemas/artist";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import type { TPlaylistPage } from "@/lib/api/schemas/playlist";
import type { TUserPage } from "@/lib/api/schemas/user";
import { capitalizeFirstLetter } from "@/lib/strings";
import { formatDuration } from "@/lib/time";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/ui/dialog";
import { ArtistPageHero } from "./artist-hero";
import { EntityPageControls } from "./controls";
import { EntityPageHeader } from "./header";
import { calcPageHeadingSize } from "./utils";

type TEntityPageHero = {
	(params: { entity: "album"; data: TAlbumPage }): JSX.Element;
	(params: { entity: "playlist"; data: TPlaylistPage }): JSX.Element;
	(params: { entity: "user"; data: TUserPage }): JSX.Element;
	(params: { entity: "artist"; data: TArtistPage }): JSX.Element;
};

export const EntityPageHero: TEntityPageHero = ({ entity, data }) => {
	const { _id, accent, picture_url, name } = data;

	const width = useMainStore((s) => s.width);

	const [isPictureOpened, setIsPictureOpened] = useState(false);

	const base = tinycolor(accent).darken(15).toHexString();
	const highlight = tinycolor(accent).brighten(10).toHexString();
	const gradient = tinycolor(base).darken(10).toHexString();

	const subtitle = getSubtitle({
		entity,
		type: "type" in data && data.type,
		privacy: "privacy" in data && data.privacy,
		isLikedSongs: "is_liked_songs" in data && data.is_liked_songs,
	});

	return (
		<div className="mb-6">
			<EntityPageHeader _id={_id} entity={entity} name={name} accent={accent} />

			{entity === "artist" ? (
				<ArtistPageHero artist={data} />
			) : (
				<div
					className="relative h-[min(30vh,clamp(186px,186px+(100cqw-600px)/424*150,336px))]"
					style={{
						backgroundColor: base,
						backgroundImage: `linear-gradient(in oklch to bottom, ${highlight}, transparent), none`,
					}}
				>
					<div
						className="absolute bottom-[-180px] h-[180px] w-full -z-1"
						style={{
							backgroundImage: `linear-gradient(in oklch to bottom, ${gradient}, transparent), none`,
						}}
					/>
					<div className="container p-6 w-full h-full flex items-end gap-6">
						{/** biome-ignore lint/a11y/noStaticElementInteractions: skip */}
						{/** biome-ignore lint/a11y/useKeyWithClickEvents: skip */}
						<img
							onClick={() => setIsPictureOpened(true)}
							src={`${picture_url}?w=450&h=450`}
							alt=""
							className={cn([
								`w-[clamp(128px,128px+(100cqw-600px)/424*104,232px)] h-[clamp(128px,128px+(100cqw-600px)/424*104,232px)] aspect-square shadow-xl shadow-black/40`,
								entity === "album" &&
									"cursor-pointer transition-transform will-change-transform hover:scale-[1.015]",
								entity === "user" ? "rounded-full" : "rounded-[4px]",
							])}
						/>
						<Dialog open={isPictureOpened} onOpenChange={setIsPictureOpened}>
							<DialogContent
								showCloseButton={false}
								className={cn([
									"w-[640px] h-[640px] max-w-[640px]! border-0 p-0",
								])}
							>
								<DialogTitle className="hidden pointer-events-none" />
								<img
									src={`${picture_url}?w=1280&h=1280`}
									alt=""
									className={cn([
										`w-[640px] h-[640px] aspect-square shadow-xl shadow-black/40`,
									])}
								/>
							</DialogContent>
						</Dialog>

						<div className="flex flex-col">
							<p className="text-sm text-white">{subtitle}</p>
							<h1
								className="text-white font-bold"
								style={{ fontSize: calcPageHeadingSize({ text: name, width }) }}
							>
								{name}
							</h1>

							{"description" in data && <p>{data.description}</p>}

							{(entity === "album" || entity === "playlist") && (
								<div className="flex gap-1.5 items-center text-sm text-white/70">
									<img
										src={`${data.author.picture_url}?w=48&h=48`}
										alt={data.name}
										className="w-6 h-6 min-w-6 rounded-full object-cover"
									/>
									<Link
										to="/artist/$id"
										params={{ id: data.author._id }}
										className="font-bold text-white"
									>
										{data.author.name}
									</Link>
									<Dot />
									<p>
										{data.tracks_count} songs,{" "}
										{formatDuration(data.total_duration)}
									</p>
								</div>
							)}

							{entity === "user" && (
								<div className="flex items-center text-white [&_a]:hover:underline text-sm gap-2">
									<Link to=".">{data.followers_count} Followers</Link>
									<Dot />
									<Link to=".">{data.following_count} Following</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{entity !== "user" && (
				<EntityPageControls _id={_id} entity={entity} name={name} />
			)}
		</div>
	);
};

const Dot = () => <div className="bg-white/70 rounded-full w-1 h-1" />;

const getSubtitle = ({
	entity,
	type,
	privacy,
	isLikedSongs,
}: {
	entity: TEntityTypes;
	type: TAlbumPage["type"] | false;
	privacy: TPlaylistPage["privacy"] | false;
	isLikedSongs: boolean;
}) => {
	let result: string = entity;

	if (entity === "album" && type) result = capitalizeFirstLetter(type);
	else if (entity === "playlist" && privacy)
		result = `${!isLikedSongs ? capitalizeFirstLetter(privacy) : ""} Playlist`;
	else result = "Profile";

	return result;
};
