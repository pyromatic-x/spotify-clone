import {
	createRootRoute,
	Outlet,
	redirect,
	useLocation,
} from "@tanstack/react-router";
import { APP_PORTAL } from "@/constants/portals";
import { QUERY_KEY_USER } from "@/constants/queries";
import { AudiobarModule } from "@/features/audiobar";
import { HeaderModule } from "@/features/header";
import { LibraryModule } from "@/features/library";
import { MainModule } from "@/features/main";
import { SidebarModule } from "@/features/sidebar";
import { DocumentTitleProvider } from "@/hooks/use-document-title";
import { HTTP } from "@/lib/api/http/client";
import { queryClient } from "@/lib/query-client";
import { ErrorPage } from "./-error";
import { NotFoundPage } from "./-not-found";
import { Login } from "./login";

export const Route = createRootRoute({
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/login") return;

		try {
			await queryClient.fetchQuery({
				queryKey: [QUERY_KEY_USER],
				queryFn: () => HTTP.get("user"),
				gcTime: 1500,
			});
		} catch {
			throw redirect({ to: "/login" });
		}
	},
	component: () => {
		const location = useLocation();

		if (location.pathname === "/login") {
			return <Login />;
		}

		return (
			<DocumentTitleProvider>
				<AppLayout>
					<Outlet />
				</AppLayout>
			</DocumentTitleProvider>
		);
	},
	notFoundComponent: ({ data }) => <NotFoundPage data={data} />,
	errorComponent: (props) => {
		return (
			<AppLayout>
				<ErrorPage {...props} />
			</AppLayout>
		);
	},
});

function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main
			id={APP_PORTAL}
			className="p-2 h-screen gap-2 grid overflow-hidden"
			style={{
				gridTemplateAreas: `"header header header"
                            "library main sidebar"
                            "audiobar audiobar audiobar"`,
				gridTemplateColumns: "auto 1fr auto",
				gridTemplateRows: "auto 1fr auto",
			}}
		>
			<HeaderModule />
			<LibraryModule />
			<MainModule>{children}</MainModule>
			<AudiobarModule />
			<SidebarModule />
		</main>
	);
}
