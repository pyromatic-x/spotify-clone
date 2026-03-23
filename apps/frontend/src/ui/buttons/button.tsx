import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

const buttonVariants = cva(
	"rounded-4xl cursor-pointer flex items-center justify-center gap-2 relative",
	{
		variants: {
			variant: {
				default: "text-[#b3b3b3] hover:scale-103 hover:text-white text-sm",
				white:
					"bg-white/90 text-black/90 hover:bg-white disabled:bg-white/60 disabled:cursor-not-allowed focus-visible:bg-white",
				filled: "bg-[#1e1e1e] hover:bg-[#2a2a2a] transition",
				outlined:
					"border border-[#7c7c7c] rounded-full font-bold text-sm text-white hover:scale-103",
				transparent:
					"bg-white/10 text-white hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed disabled:text-[#8d8d8d]",
				link: "text-[#b3b3b3] hover:text-white hover:underline hover:scale-103 font-bold text-sm",
				primary:
					"bg-primary w-min-max font-semibold text-black whitespace-nowrap hover:scale-[1.04] hover:bg-[#3be477] transition-transform duration-50",
			},
			size: {
				default: "py-1 px-3",
				wide: "px-4 py-2 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	loading = false,
	tooltip,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		loading?: boolean;
		tooltip?: string;
	}) {
	return (
		<Tooltip delayDuration={650}>
			<TooltipTrigger asChild>
				<button
					data-slot="button"
					className={cn(buttonVariants({ variant, size, className }))}
					{...props}
				>
					{loading ? (
						<Loader2Icon className="animate-spin w-[25px]! h-[25px]!" />
					) : (
						props.children
					)}
				</button>
			</TooltipTrigger>
			{tooltip && <TooltipContent>{tooltip}</TooltipContent>}
		</Tooltip>
	);
}

export { Button, buttonVariants };
