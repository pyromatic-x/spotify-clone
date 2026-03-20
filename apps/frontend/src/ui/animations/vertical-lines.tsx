import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import "./vertical-lines.styles.css";

type TProps = ComponentProps<"div"> & {
	wrapperProps?: ComponentProps<"div">;
};

export function VerticalLinesAnimation({ wrapperProps, ...rest }: TProps) {
	return (
		<div
			className={cn(["flex justify-center", wrapperProps?.className])}
			{...wrapperProps}
		>
			<div
				className={cn(["vertical-lines-animation", rest.className])}
				{...rest}
			>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
}
