import background from "@assets/images/login-background.png";
import Logo from "@assets/svg/logo-green.svg?react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { QUERY_KEY_USER } from "@/constants/queries";
import { LoginForm } from "@/features/auth/login/login-form";
import { queryClient } from "@/lib/query-client";

export const Route = createFileRoute("/login")({
	beforeLoad: () => {
		const user = queryClient.getQueryData([QUERY_KEY_USER]);
		if (user) throw redirect({ to: "/" });
	},
	component: Login,
});

export function Login() {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center relative">
			<div
				className="absolute top-0 left-0 w-full h-full blur-xs brightness-15"
				style={{ backgroundImage: `url(${background})` }}
			/>
			<div className="w-[440px] flex flex-col items-center px-14 py-8 bg-[#121212] rounded-md relative z-10">
				<div className="flex items-center gap-2 mb-12">
					<Logo className="[&_path]:first:fill-white size-10" />
					<p className="font-semibold text-2xl">Spotify</p>
				</div>
				<p className="font-semibold text-3xl mb-6">Login to continue.</p>

				<LoginForm />

				<div className="my-10 bg-white/30 w-full h-px" />

				<p className="font-semibold text-xl mb-4">
					THIS IS NOT REAL SPOTIFY APP.
				</p>
				<p className="text-white/50 mb-2 text-sm">
					This is a demo app to show off my skills, nothing more.
				</p>
				<p className="text-white/50 text-sm">
					Mobile version is not supported yet, there will be a separate native
					mobile app one day.
				</p>
			</div>
		</div>
	);
}
