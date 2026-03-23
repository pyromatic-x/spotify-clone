import { useRouter } from "@tanstack/react-router";
import {
	OverlayScrollbarsComponent,
	type OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import {
	type ComponentProps,
	forwardRef,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import { cn } from "@/lib/utils";

export interface ScrollableRef {
	reset: (delay?: number) => void;
}

interface TProps extends PropsWithChildren {
	id?: string;
	className?: ComponentProps<"div">["className"];
	onScroll?: (top: number) => void;
	onResize?: (rect: DOMRectReadOnly) => void;
	resetOnRouteChange?: boolean;
}

export const Scrollable = forwardRef<ScrollableRef, TProps>(
	(
		{ children, id, className, onScroll, onResize, resetOnRouteChange },
		ref,
	) => {
		const instance = useRef<OverlayScrollbarsComponentRef<"div"> | null>(null);
		const router = useRouter();

		const handleOnScroll = (event: Event) =>
			onScroll?.((event.target as HTMLDivElement).scrollTop);

		useEffect(() => {
			const element = instance.current?.getElement();

			if (element && onResize) {
				const resizeObserver = new ResizeObserver((entries) => {
					for (const entry of entries) {
						onResize(entry.contentRect);
					}
				});

				resizeObserver.observe(element);

				return () => resizeObserver.disconnect();
			}
		}, [onResize]);

		const onReset = useCallback((delay = 500) => {
			const elements = instance.current?.osInstance()?.elements();

			if (elements?.viewport) {
				setTimeout(() => {
					elements.viewport.scrollTo({ top: 0, left: 0 });
				}, delay);
			}
		}, []);

		useLayoutEffect(() => {
			if (resetOnRouteChange) {
				const unsubscribe = router.subscribe("onBeforeNavigate", () => {
					onReset();
				});

				return () => unsubscribe();
			}
		}, [router, onReset, resetOnRouteChange]);

		useImperativeHandle(ref, () => ({ reset: onReset }));

		return (
			<OverlayScrollbarsComponent
				id={id}
				ref={instance}
				defer
				options={{
					scrollbars: {
						autoHide: "leave",
						autoHideDelay: 450,
					},
				}}
				events={{ scroll: (_, e) => handleOnScroll(e) }}
				className={cn([className])}
			>
				{children}
			</OverlayScrollbarsComponent>
		);
	},
);
