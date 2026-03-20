import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"bg-[#373737] relative overflow-hidden rounded-[4px]",
				className,
			)}
			{...props}
		>
			<span
				className="absolute inset-0 animate-wave"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)",
				}}
			/>
		</div>
	);
}

export { Skeleton };
