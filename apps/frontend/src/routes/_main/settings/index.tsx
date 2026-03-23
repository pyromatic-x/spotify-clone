import { createFileRoute } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { FooterModule } from "@/features/footer";
import { useLibraryStore } from "@/features/library/store";
import { useSettingsMutation } from "@/hooks/mutations/use-settings-mutation";
import { useSettings } from "@/hooks/query/use-settings";
import { useUser } from "@/hooks/query/use-user";
import { getOS } from "@/lib/navigator";
import { Button } from "@/ui/buttons/button";
import { Switch } from "@/ui/form/switch";

export const Route = createFileRoute("/_main/settings/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: settings } = useSettings();
	const { data: user } = useUser();
	const mutation = useSettingsMutation();
	const update = useLibraryStore((store) => store.update);

	if (!settings) return;

	const onChangeLibraryLayout = (state: boolean) => {
		mutation.mutateAsync({ library: { compact: state } }).then(() => {
			update({
				payload: { view: state ? "compact-list" : "default-list" },
				user,
			});
		});
	};

	return (
		<div>
			<div className="max-w-[900px] mx-auto p-8 flex flex-col gap-7">
				<h1 className="font-bold text-3xl">Settings</h1>
				<Wrapper>
					<Title>Account</Title>
					<Row label="Edit login methods">
						<Button variant="outlined">
							Edit <RiExternalLinkLine size={18} />
						</Button>
					</Row>
				</Wrapper>

				<Wrapper>
					<Title>Language</Title>
					<Row label="Choose language - Changes will be applied after restarting the app"></Row>
				</Wrapper>

				<Wrapper>
					<Title>Audio quality</Title>
					<Row label="Streaming quality"></Row>
					<Row
						label="Normalize volume - Set the same volume level for all songs and podcasts"
						labelFor="settings.quality.normalize"
					>
						<Switch
							id="settings.quality.normalize"
							defaultChecked={settings?.quality.normalize}
							onCheckedChange={(state) =>
								mutation.mutate({ quality: { normalize: state } })
							}
						/>
					</Row>
				</Wrapper>

				<Wrapper>
					<Title>Your Library</Title>
					<Row
						label="Use compact library layout"
						labelFor="settings.library.compact"
					>
						<Switch
							id="settings.library.compact"
							defaultChecked={settings?.library.compact}
							onCheckedChange={onChangeLibraryLayout}
						/>
					</Row>
				</Wrapper>

				<Wrapper>
					<Title>Display</Title>
					<Row
						label="Show the now-playing panel on click of play"
						labelFor="settings.display.show_now_playing"
					>
						<Switch
							id="settings.display.show_now_playing"
							defaultChecked={settings?.display.show_now_playing}
							onCheckedChange={(state) =>
								mutation.mutate({ display: { show_now_playing: state } })
							}
						/>
					</Row>
					<Row
						label="Display short, looping visuals on tracks (Canvas)"
						labelFor="settings.display.show_canvas"
					>
						<Switch
							id="settings.display.show_canvas"
							defaultChecked={settings?.display.show_canvas}
							onCheckedChange={(state) =>
								mutation.mutate({ display: { show_canvas: state } })
							}
						/>
					</Row>
				</Wrapper>

				<Wrapper>
					<Title>Playback</Title>
					<div className="flex flex-col px-4 py-6 bg-[#2a2a2a] rounded-[8px]">
						<p className="text-2xl font-bold">
							Fine-tune your sound with the {getOS()} app
						</p>
						<div className="flex gap-4">
							<p className="text-[#b3b3b3]">
								Improve streaming quality, adjust the equalizer to best fit your
								speakers, and enjoy consistent volume across all your tracks.
							</p>
							<Button variant="primary">Download the free app</Button>
						</div>
					</div>
				</Wrapper>

				<Wrapper>
					<Title>Social</Title>
					<Row
						label="People can see the playlists you’ve added to your profile."
						labelFor="settings.social.show_playlists"
					>
						<Switch
							id="settings.social.show_playlists"
							defaultChecked={settings?.social.show_playlists}
							onCheckedChange={(state) =>
								mutation.mutate({ social: { show_playlists: state } })
							}
						/>
					</Row>
					<Row
						label="On your profile, people can see who’s following you and who you’re following."
						labelFor="settings.social.show_following"
					>
						<Switch
							id="settings.social.show_following"
							defaultChecked={settings?.social.show_following}
							onCheckedChange={(state) =>
								mutation.mutate({ social: { show_following: state } })
							}
						/>
					</Row>
					<Row
						label="Share my listening activity with followers on desktop"
						labelFor="settings.social.share_activity"
					>
						<Switch
							id="settings.social.share_activity"
							defaultChecked={settings?.social.share_activity}
							onCheckedChange={(state) =>
								mutation.mutate({ social: { share_activity: state } })
							}
						/>
					</Row>
				</Wrapper>
			</div>
			<FooterModule />
		</div>
	);
}

const Wrapper = ({ children }: PropsWithChildren) => (
	<div className="flex flex-col gap-2">{children}</div>
);

const Title = ({ children }: PropsWithChildren) => (
	<h2 className="text-white font-bold">{children}</h2>
);

const Row = ({
	children,
	label,
	labelFor,
}: PropsWithChildren & { label: string; labelFor?: string }) => (
	<div className="flex items-center justify-between">
		<label className="text-sm text-[#b3b3b3]" htmlFor={labelFor}>
			{label}
		</label>
		{children}
	</div>
);
