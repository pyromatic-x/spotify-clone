import { Link } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	IoChevronBackOutline as ChevronLeft,
	IoChevronForward as ChevronRight,
} from "react-icons/io5";
import type { TEntityCard } from "@/lib/api/schemas/common";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { useMainStore } from "../main/store";
import { EntityCard } from "./cards/entity-card";

import "./row.styles.css";

interface TProps {
	title?: string;
	subtitle?: string;
	link?: string;
	entities: Array<TEntityCard>;
	scrollable: boolean;
}

const SCROLL_STEP = 400;

export const EntitiesRow = memo(
	({ scrollable, title, subtitle, link, entities }: TProps) => (
		<section>
			{subtitle && <p className="text-[12px] text-[#b3b3b3]">{subtitle}</p>}
			<div className="flex items-center justify-between">
				{title && (
					<h2 className="font-bold text-2xl hover:underline mb-2">
						<Link to={link || "."}>{title}</Link>
					</h2>
				)}
				{link && (
					<Link to={link} className="text-sm text-[#b3b3b3] hover:underline">
						Show all
					</Link>
				)}
			</div>
			{scrollable ? (
				<Scrollable entities={entities} />
			) : (
				<Simple entities={entities} />
			)}
		</section>
	),
);

const Scrollable = ({ entities }: Pick<TProps, "entities">) => {
	const width = useMainStore((s) => s.width);

	const [isScrollableLeft, setIsScrollableLeft] = useState(false);
	const [isScrollableRight, setIsScrollableRight] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handler = useCallback((target: HTMLElement) => {
		const { scrollWidth, scrollLeft, offsetWidth } = target;

		setIsScrollableLeft(scrollLeft > 0);
		setIsScrollableRight(scrollWidth - Math.ceil(scrollLeft) > offsetWidth);
	}, []);

	useEffect(() => {
		const element = ref.current;

		if (element) {
			handler(ref.current);
			element.addEventListener("scroll", (e) =>
				handler(e.target as HTMLElement),
			);
		}

		return () => {
			element?.removeEventListener("scroll", (e) =>
				handler(e.target as HTMLElement),
			);
		};
	}, [handler]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: recalc on container size change
	useEffect(() => {
		if (ref.current) handler(ref.current);
	}, [width, handler]);

	const handleOnScrollLeft = () => {
		if (ref.current) {
			ref.current.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
		}
	};
	const handleOnScrollRight = () => {
		if (ref.current) {
			ref.current.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
		}
	};

	return (
		<div className="relative entities-row-wrapper">
			<div className="min-w-full w-auto overscroll-contain scroll-smooth">
				<div
					className="grid grid-flow-col overflow-x-auto no-scrollbar entities-row-container"
					ref={ref}
				>
					{entities.map((t) => (
						<EntityCard key={t._id} {...t} />
					))}
				</div>
			</div>
			<div
				className={cn([
					"absolute top-0 left-0 w-full h-full flex justify-between items-center pointer-events-none px-5",
					"before:absolute before:left-0 before:h-full before:w-[120px] z-2 before:bg-[linear-gradient(90deg,hsla(0,0%,7%,.7),#121212_0,transparent_100%)] before:transition-opacity",
					"after:absolute after:right-0 after:h-full after:w-[120px] z-2 after:bg-[linear-gradient(-90deg,hsla(0,0%,7%,.7),#121212_0,transparent_100%)] after:transition-opacity",
					!isScrollableLeft && "before:opacity-0",
					!isScrollableRight && "after:opacity-0",
				])}
			>
				<IconButton
					variant="circle"
					className={cn([
						"relative z-3 pointer-events-auto",
						!isScrollableLeft && "pointer-events-none opacity-0",
					])}
					onClick={handleOnScrollLeft}
				>
					<ChevronLeft />
				</IconButton>
				<IconButton
					variant="circle"
					className={cn([
						"relative z-3 pointer-events-auto",
						!isScrollableRight && "pointer-events-none opacity-0",
					])}
					onClick={handleOnScrollRight}
				>
					<ChevronRight />
				</IconButton>
			</div>
		</div>
	);
};

const Simple = ({ entities }: Pick<TProps, "entities">) => {
	const width = useMainStore((s) => s.width);

	const count = useMemo(() => {
		if (width > 1820) return 10;
		else if (width > 1650) return 9;
		else if (width > 1470) return 8;
		else if (width > 1280) return 7;
		else if (width > 1100) return 6;
		else if (width > 920) return 5;
		else if (width > 740) return 4;

		return 3;
	}, [width]);

	return (
		<div className="flex -mx-3">
			{entities.slice(0, count).map((t) => (
				<EntityCard key={t._id} {...t} />
			))}
		</div>
	);
};
