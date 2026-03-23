"use client";

import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import type { PropsWithChildren } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import type { TTrack } from "@/lib/api/schemas/track";
import { toNumberWithDigits } from "@/lib/number";
import { formatDuration } from "@/lib/time";
import { cn } from "@/lib/utils";
import { VerticalLinesAnimation } from "@/ui/animations/vertical-lines";
import { IconButton } from "@/ui/buttons/icon-button";
import { LikeButton } from "@/ui/buttons/like-button";
import { PlayButton } from "@/ui/buttons/play-button";

export interface TTracksTableRow {
	_id: string;
	entity: Exclude<TEntityTypes, "user">;
	entity_id: string;
	idx: number;
	title: {
		picture_url: string;
		name: string;
		artist: {
			_id: string;
			name: string;
		};
	};
	times_listened: string;
	album: {
		_id: string;
		name: string;
	};
	date: string;
	in_library: boolean;
	duration: string;
	settings: null;
}

export const tracksTableColumns: Array<ColumnDef<TTracksTableRow>> = [
	{
		accessorKey: "_id",
		cell: () => null,
		header: () => null,
	},
	{
		accessorKey: "entity",
		cell: () => null,
		header: () => null,
	},
	{
		accessorKey: "entity_id",
		cell: () => null,
		header: () => null,
	},
	{
		accessorKey: "idx",
		header: "#",
		cell: ({ row }) => {
			const _id = row.getValue("_id") as TTracksTableRow["_id"];
			const idx = row.getValue("idx") as TTracksTableRow["idx"];
			const entity = row.getValue("entity") as TTracksTableRow["entity"];
			const entity_id = row.getValue(
				"entity_id",
			) as TTracksTableRow["entity_id"];

			const { isPlaying } = useAudioPlayerContext();
			const track = useAudiobar((state) => state.track);

			const current = track?._id === _id;
			const playing = current && isPlaying;
			const hovered = row.getIsHovered();

			const Wrapper = ({ children }: PropsWithChildren) => (
				<div className="text-base text-[#b3b3b3]">{children}</div>
			);

			if (hovered) {
				return (
					<div className="w-full flex items-center justify-center">
						<PlayButton
							track_id={_id}
							entity={entity}
							entity_id={entity_id}
							variant="secondary"
							className="p-0 w-max [&_svg]:w-auto [&_svg]:h-auto"
						/>
					</div>
				);
			}

			if (current) {
				return (
					<Wrapper>
						{playing ? (
							<VerticalLinesAnimation />
						) : (
							<span className="text-primary">{idx}</span>
						)}
					</Wrapper>
				);
			}

			return <Wrapper>{idx}</Wrapper>;
		},
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			const { name, picture_url, artist } = row.getValue(
				"title",
			) as TTracksTableRow["title"];

			const _id = row.getValue("_id") as TTracksTableRow["_id"];
			const track = useAudiobar((state) => state.track);

			const current = track?._id === _id;

			return (
				<div className="flex items-center gap-3">
					<img
						alt={name}
						src={`${picture_url}?w=80&h=80`}
						className="h-10 w-10 rounded-[4px] aspect-square"
					/>
					<div className="flex flex-col items-start">
						<p className={cn(["text-base", current && "text-primary"])}>
							{name}
						</p>
						<Link
							to={`/artist/$id`}
							params={{ id: artist._id }}
							className="text-[#b3b3b3] hover:underline hover:text-white text-sm"
						>
							{artist.name}
						</Link>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "times_listened",
		header: () => null,
		enableHiding: true,
		cell: ({ row }) => {
			const times_listened = row.getValue(
				"times_listened",
			) as TTracksTableRow["times_listened"];

			return (
				<p className="text-[#b3b3b3]">{toNumberWithDigits(times_listened)}</p>
			);
		},
	},
	{
		accessorKey: "album",
		header: "Album",
		enableHiding: true,
		cell: ({ row }) => {
			const { name, _id } = row.getValue("album") as TTracksTableRow["album"];

			return (
				<Link
					to={`/album/$id`}
					params={{ id: _id }}
					className="text-[#b3b3b3] hover:underline hover:text-white text-sm"
				>
					{name}
				</Link>
			);
		},
	},
	{
		accessorKey: "date",
		header: "Date added",
		enableHiding: true,
		cell: ({ row }) => {
			const date = row.getValue("date") as TTracksTableRow["date"];

			return <p className="text-[#b3b3b3]">{date}</p>;
		},
	},
	{
		accessorKey: "in_library",
		header: "",
		cell: ({ row }) => {
			const _id = row.getValue("_id") as TTracksTableRow["_id"];
			const in_library = row.getValue(
				"in_library",
			) as TTracksTableRow["in_library"];

			return (
				<LikeButton
					_id={_id}
					defaultValue={in_library}
					size="sm"
					className="group-hover:opacity-100 opacity-0 transition-none justify-self-end"
				/>
			);
		},
	},
	{
		accessorKey: "duration",
		header: () => <LuClock3 className="justify-self-end" size={18} />,
	},
	{
		accessorKey: "settings",
		header: "",
		cell: () => {
			return (
				<IconButton
					tooltip="SHOWCASE: not implemented yet"
					className="group-hover:opacity-100 opacity-0 transition-none size-4.5"
					size="auto"
				>
					<BsThreeDots />
				</IconButton>
			);
		},
	},
];

export const tracksTableTransform = ({
	tracks,
	entity,
	entity_id,
}: Pick<TTracksTableRow, "entity" | "entity_id"> & {
	tracks: Array<TTrack>;
}): Array<TTracksTableRow> =>
	tracks.map((t, i) => ({
		_id: t._id,
		entity,
		entity_id,
		idx: i + 1,
		title: {
			name: t.name,
			artist: t.author,
			picture_url: t.album.picture_url,
		},
		times_listened: t.times_listened,
		album: {
			_id: t.album._id,
			name: t.album.name,
		},
		date: dayjs(t.added_at).fromNow().toString(),
		in_library: t.in_library,
		duration: formatDuration(t.duration),
		settings: null,
	}));
