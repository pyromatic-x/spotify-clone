import Logo from "@assets/svg/logo-green.svg?react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/ui/buttons/button";

export function NotFoundPage({ data }: { data: unknown }) {
	console.log(data);
	const navigate = useNavigate();

	const onGoHome = () => {
		navigate({ to: "/" });
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<Logo width={60} height={60} className="mb-8" />
			<h1 className="text-5xl font-bold mb-3">Page not found</h1>
			<p>We can't seem to find the page you are looking for.</p>

			<div className="flex flex-col gap-8 mt-8">
				<Button
					type="button"
					onClick={onGoHome}
					variant="white"
					className="px-8 py-3 font-semibold"
				>
					Home
				</Button>
				<Button type="button" variant="link">
					Help
				</Button>
			</div>
		</div>
	);
}
