import { Link } from "@tanstack/react-router";
import type { TEntityCard, TEntityTypes } from "@/lib/api/schemas/common";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

type TProps = {
	size: "full" | "compact";
	description?: string;
	type: TEntityTypes;
	truncate: 1 | 2;
	pinned?: boolean;
	highlight?: boolean;
} & TEntityCard;

export const EntityCard = ({
	_id,
	picture_url,
	type,
	name,
	description,
	size,
	highlight,
}: TProps) => {
	const tooltip = size === "compact" ? `${name}` : "";

	return (
		<Tooltip>
			<TooltipTrigger>
				<Link
					// @ts-expect-error TODO
					to={`/${type}/${_id}`}
					className={cn([
						"relative rounded-md bg-transparent cursor-pointer w-full h-full overflow-visible",
						size === "compact" ? "aspect-[1] p-1.5" : "aspect-[unset] p-2.5",
					])}
				>
					<div className="flex relative">
						<img
							className={cn([
								"w-full object-cover",
								type === "artist" || type === "user"
									? "rounded-full"
									: "rounded-md",
							])}
							src={`${picture_url}?w=350&h=350`}
							alt={name}
						/>
						{/* {type !== "user" && size !== "compact" && (
              <PrimaryPlayButton
                _id={_id}
                name={name}
                type={type}
                visible={keepPlayButton}
              />
            )} */}
					</div>
					{size !== "compact" && (
						<>
							<p
								className={cn([
									"line-clamp-1 mt-1",
									highlight ? "text-primary" : "text-white",
								])}
							>
								{name}
							</p>
							{description && (
								<p className="line-clamp-1 text-sm">{description}</p>
							)}
						</>
					)}
				</Link>
			</TooltipTrigger>
			{tooltip && <TooltipContent side="right">{tooltip}</TooltipContent>}
		</Tooltip>
	);
};
