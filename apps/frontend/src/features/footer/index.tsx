import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
import {
	FOOTER_LEGAL,
	FOOTER_SECTIONS,
	FOOTER_SOCIALS,
} from "@/constants/footer";
import { cn } from "@/lib/utils";

const SocialIcons = {
	Instagram: IoLogoInstagram,
	Twitter: IoLogoTwitter,
	Facebook: IoLogoFacebook,
};

export const FooterModule = () => {
	return (
		<div className="mt-10 px-8">
			<div className="w-full h-px bg-white/5 my-12" />

			<div className="flex justify-between flex-wrap gap-4">
				{FOOTER_SECTIONS.map((section) => (
					<div key={section.title} className="flex flex-col gap-2">
						<p className="text-white font-medium">{section.title}</p>
						{section.links.map((link) => (
							<StyledLink key={link} to="/">
								{link}
							</StyledLink>
						))}
					</div>
				))}
				<div className="flex gap-2">
					{FOOTER_SOCIALS.map((social) => {
						const Icon = SocialIcons[social.service];
						return (
							<Link
								key={social.service}
								to="/"
								className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292929] hover:bg-[#727272]"
							>
								<Icon size={20} />
							</Link>
						);
					})}
				</div>
			</div>

			<div className="w-full h-px bg-white/5 my-10" />

			<div className="flex justify-between flex-wrap pb-10 gap-2.5">
				<div className="flex flex-wrap gap-4">
					{FOOTER_LEGAL.map((link) => (
						<StyledLink key={link}>{link}</StyledLink>
					))}
				</div>
				<p>© {new Date().getFullYear()} pyromatic</p>
			</div>
		</div>
	);
};

const StyledLink = (props: ComponentProps<typeof Link>) => (
	<Link
		{...props}
		className={cn([
			"text-[#b0b0b0] hover:text-white hover:underline",
			props.className,
		])}
	>
		{props.children}
	</Link>
);
