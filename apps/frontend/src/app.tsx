import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { createRoot } from "react-dom/client";
import { AudioPlayerProvider } from "react-use-audio-player";
import { NoMobileWrapper } from "./features/wrappers/no-mobile-wrapper";
import { queryClient } from "./lib/query-client";
import { routeTree } from "./routeTree.gen";
import "./global.css";

dayjs.extend(RelativeTime);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: skip
createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<AudioPlayerProvider>
			<NoMobileWrapper>
				<RouterProvider router={router} />
			</NoMobileWrapper>
		</AudioPlayerProvider>
		<ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
	</QueryClientProvider>,
);
