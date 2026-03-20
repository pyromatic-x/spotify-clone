import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useIntersectionObserver } from "usehooks-ts";
import { FooterModule } from "@/features/footer";
import { useFeed } from "@/hooks/query/use-feed";
import type { TAlbumCard } from "@/lib/api/schemas/album";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/buttons/button";
import { IconButton } from "@/ui/buttons/icon-button";
import { LikeButton } from "@/ui/buttons/like-button";
import { PlayButton } from "@/ui/buttons/play-button";

export const Route = createFileRoute("/_main/feed/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeed();

	const albums = useMemo(() => {
		if (!data?.pages) return [];

		return data?.pages.flatMap((t) => t?.albums);
	}, [data?.pages]);

	const { ref, isIntersecting } = useIntersectionObserver({
		threshold: 0.5,
	});

	useEffect(() => {
		if (isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (!albums.length) return;

	return (
		<>
			<div className="max-w-[800px] mx-auto mt-10 px-6">
				<h1 className="font-bold text-[32px] text-white">What's New</h1>
				<p className="text-sm text-[#b3b3b3]">
					The latest releases from artists, podcasts, and shows you follow.
				</p>
				<div className="flex gap-2 mt-4 mb-8">
					<Button variant="filled">Music</Button>
					<Button variant="filled">Podcasts & Shows</Button>
				</div>

				{Boolean(albums.length) &&
					albums.map((album) => (
						<>
							<hr className="border-[#ffffff1a]" />
							<Card {...album} />
						</>
					))}

				<div ref={ref} className="w-0 h-0" />
			</div>
			<FooterModule />
		</>
	);
}

const Card = ({
	_id,
	name,
	picture_url,
	album_type,
	released_at,
	author,
}: TAlbumCard) => {
	const navigate = useNavigate();

	return (
		<div className="h-[212px] flex px-3 pt-4 pb-6 gap-6 group hover:bg-[#1f1f1f] rounded-[6px] relative">
			<img
				src={`${picture_url}?w=224&h=224`}
				alt=""
				className="w-28 h-28 rounded-[4px] aspect-square shadow-lg"
			/>
			<div className="flex flex-col h-full w-full justify-between">
				<div className="[&_a]:hover:underline text-white">
					<Link
						to="/album/$id"
						params={{ id: _id }}
						className="block mb-1 relative z-1"
					>
						{name}
					</Link>
					<Link
						to="/artist/$id"
						params={{ id: author._id }}
						className="block text-sm mb-2 relative z-1"
					>
						{author.name}
					</Link>
					<p>
						{getAlbumType(album_type)} <span className="mx-1">·</span>{" "}
						<span className="text-sm">{dayjs(released_at).fromNow()}</span>
					</p>
				</div>
				<div className="flex w-full justify-between">
					<div className="flex gap-8">
						<LikeButton _id={_id} className="z-1" />
						<IconButton
							disabled
							className={cn([
								"flex items-center justify-center rounded-full border-2 h-6 w-6",
								"border-white/30 text-[#b3b3b3] bg-transparent",
								"opacity-0 group-hover:opacity-100",
							])}
							size="md"
						>
							<FaLongArrowAltDown />
						</IconButton>
						<IconButton
							disabled
							className={cn([
								"flex items-center justify-center rounded-full",
								"opacity-0 group-hover:opacity-100",
							])}
							size="md"
						>
							<BsThreeDots />
						</IconButton>
					</div>
					<PlayButton
						entity="album"
						entity_id={_id}
						variant="white"
						className="relative z-1"
					/>
				</div>
			</div>

			<button
				type="button"
				className="w-full h-full absolute top-0 left-0 cursor-pointer z-0"
				onClick={() => navigate({ to: "/album/$id", params: { id: _id } })}
			/>
		</div>
	);
};

const getAlbumType = (type: TAlbumCard["album_type"]) => {
	if (type === "album") return "Album";
	if (type === "ep") return "EP";
	else return "Single";
};
