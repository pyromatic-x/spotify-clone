import { createFileRoute } from "@tanstack/react-router";
import { EntityPageHero } from "@/features/entities/page/entity-hero";
import { EntitiesRow } from "@/features/entities/row";
import { FooterModule } from "@/features/footer";
import { useUserPage } from "@/hooks/query/use-user-page";
import { UserPageControls } from "../../../features/entities/page/user-controls";

export const Route = createFileRoute("/_main/user/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: user } = useUserPage();

	if (!user) return;

	return (
		<div className="pb-30">
			<EntityPageHero entity="user" data={user} />
			<div className="mx-auto container px-6">
				<div className="flex flex-col gap-10">
					<UserPageControls />

					<EntitiesRow
						entities={user.recent_artists}
						title="Recently played artists"
						scrollable={false}
					/>
					{Boolean(user.followers_count) && (
						<EntitiesRow
							entities={user.followers}
							title="Followers"
							scrollable={false}
						/>
					)}
					{Boolean(user.following_count) && (
						<EntitiesRow
							entities={user.following}
							title="Following"
							scrollable={false}
						/>
					)}
				</div>
			</div>
			<FooterModule />
		</div>
	);
}
