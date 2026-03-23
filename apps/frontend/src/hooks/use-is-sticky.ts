import { useEffect, useRef, useState } from "react";

export const useIsSticky = (options: IntersectionObserverInit) => {
	const [isSticky, setIsSticky] = useState(false);

	const ref = useRef<Element>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive
	useEffect(() => {
		if (ref.current) {
			const observer = new IntersectionObserver(
				([e]) => setIsSticky(e.intersectionRatio < 1),
				options,
			);

			observer.observe(ref.current);

			return () => {
				if (ref.current) observer.unobserve(ref.current);
			};
		}
	}, [ref.current]);

	return { isSticky, ref: ref as unknown as (node?: Element | null) => void };
};
