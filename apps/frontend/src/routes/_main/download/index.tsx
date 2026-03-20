import Image from "@assets/images/download-page-image.png";
import Logo from "@assets/svg/logo-brand.svg?react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getOS } from "@/lib/navigator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_main/download/")({
	component: RouteComponent,
});

function RouteComponent() {
	const os = getOS();

	return (
		<div
			className="px-10 pb-10 rounded-md"
			style={{
				backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNDIgMzQyIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjMiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHR5cGU9ImZyYWN0YWxOb2lzZSIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjIiLz48L3N2Zz4="),-webkit-gradient(linear,left bottom,left top,from(#f79bd2),color-stop(70%,#5eac96))`,
			}}
		>
			<div
				className="p-10 flex gap-8 [@container_(max-width:900px)]:flex-col"
				style={{
					backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNDIgMzQyIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjMiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHR5cGU9ImZyYWN0YWxOb2lzZSIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjIiLz48L3N2Zz4="),linear-gradient(180deg,#f79bd2,#5eac96 70%)`,
				}}
			>
				<div
					className={cn([
						"text-black flex flex-col gap-8 shrink-0",
						"w-[40%] [@container_(max-width:900px)]:w-full",
					])}
				>
					<Logo className="w-max" />
					<h2 className="text-3xl font-bold">Download Spotify for {os}</h2>
					<p>{descriptions[os]}</p>
					<Link to="." className="hover:underline">
						Download directly from Spotify
					</Link>
				</div>
				<div
					className={cn([
						"w-[60%] max-w-[1100px] min-w-[860px]",
						"[@container_(max-width:900px)]:w-full [@container_(max-width:900px)]:min-w-auto",
					])}
				>
					<img src={Image} alt="" className="w-full object-contain" />
				</div>
			</div>
		</div>
	);
}

const descriptions: Record<ReturnType<typeof getOS>, string> = {
	unknown:
		"Enjoy high-quality audio and offline playback, plus seamless platform integration and a friend activity feed that lets you see what your friends are listening to in real time.",
	Android:
		"Enjoy studio-quality audio and offline playback on the go, featuring Android Auto support and a live friend activity feed that lets you see what your friends are listening to in real time.",
	Linux:
		"Enjoy lossless audio quality and offline playback, with native Linux desktop integration and a friend activity feed that displays what your friends are listening to in real time.",
	"Mac OS":
		"Experience premium audio quality and offline listening, with seamless integration across your Apple devices and a real-time friend activity feed that shows what your friends are playing right now.",
	Windows:
		"Enjoy high-quality audio and offline playback, plus Windows Game Bar integration and a friend activity feed that lets you see what your friends are listening to in real time.",
};
