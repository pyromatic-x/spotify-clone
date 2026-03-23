import background from "@assets/images/no-mobile-background.jpg";
import { type PropsWithChildren, useRef } from "react";
import { TbDeviceMobileOff } from "react-icons/tb";
import { useResizeObserver } from "usehooks-ts";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/ui/empty";

export const NoMobileWrapper = ({ children }: PropsWithChildren) => {
	const ref = useRef<HTMLDivElement>(null);

	const { width } = useResizeObserver({ ref });

	return (
		<div ref={ref}>
			{width !== undefined &&
				(width > 800 ? (
					children
				) : (
					<div className="h-screen w-screen flex items-center justify-center">
						<div
							className="absolute top-0 left-0 w-full h-full blur-[3px] brightness-15"
							style={{ backgroundImage: `url(${background})` }}
						/>
						<div className="z-1">
							<Empty className="border border-[#000000] w-full md:w-max m-auto bg-[#121212]/60">
								<EmptyHeader>
									<EmptyMedia variant="icon">
										<TbDeviceMobileOff className="size-9" />
									</EmptyMedia>
									<EmptyTitle className="text-base">
										No mobile support yet
									</EmptyTitle>
									<EmptyDescription className="text-sm">
										As the mobile experience is vastly different from desktop
										site there is not mobile version yet. For now, please use a
										desktop or laptop computer to access the showcase app.
									</EmptyDescription>
								</EmptyHeader>
								<EmptyContent>
									The React Native app will be available in the future.
								</EmptyContent>
							</Empty>
						</div>
					</div>
				))}
		</div>
	);
};
