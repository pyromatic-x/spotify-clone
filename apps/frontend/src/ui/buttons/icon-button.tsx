import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

const buttonVariants = cva(
	"cursor-pointer flex items-center justify-center relative hover:scale-104 disabled:cursor-not-allowed [&_svg]:w-full [&_svg]:h-full [&_svg]:transition-all disabled:[&_svg]:fill-white/30",
	{
		variants: {
			variant: {
				default: "",
				"circle-on-hover": "rounded-full hover:bg-[#1e1e1e] transition",
				circle: "rounded-full bg-[#1e1e1e] hover:bg-[#2a2a2a] transition",
			},
			size: {
				default: "w-8 h-8 p-2",
				auto: "w-auto h-full p-0",
				sm: "w-5 h-5 p-0.5",
				md: "w-7 h-7 p-1",
				lg: "w-9 h-9 p-0",
				xl: "w-12 min-w-12 h-12 p-2.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export const IconButton = ({
	className,
	variant,
	size,
	active = false,
	tooltip,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		tooltip?: string;
		active?: boolean;
	}) => (
	<Tooltip delayDuration={650}>
		<TooltipTrigger asChild>
			<button
				data-slot="button"
				className={cn(
					buttonVariants({ variant, size, className }),
					active &&
						"[&_svg]:stroke-primary [&_svg]:fill-primary [&_svg_path]:fill-primary [&_svg_path]:stroke-primary",
				)}
				{...props}
			>
				{props.children}
				{active && (
					<div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
				)}
			</button>
		</TooltipTrigger>
		{!props.disabled && tooltip && <TooltipContent>{tooltip}</TooltipContent>}
	</Tooltip>
);
