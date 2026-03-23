import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";

interface TProps extends ComponentProps<"input"> {
	wrapperClassName?: ComponentProps<"div">["className"];
}

function Input({ className, type, wrapperClassName, ...props }: TProps) {
	const [visible, setIsVisible] = useState(type !== "password");

	let _type = type;

	if (type === "password") {
		_type = visible ? "text" : "password";
	}

	return (
		<div className={cn(["relative", wrapperClassName])}>
			<input
				type={_type}
				data-slot="input"
				className={cn(
					"relative w-full bg-[#333333] outline-none focus:bg-[#404040] min-h-[50px] px-4",
					type === "password" ? "pr-13" : "",
					className,
				)}
				{...props}
			/>
			{type === "password" && (
				<button
					type="button"
					className="absolute right-0 top-0 h-full px-3 text-white/60 cursor-pointer"
					onClick={() => setIsVisible(!visible)}
					aria-label="toggle password visibility"
				>
					{visible ? <EyeOff /> : <Eye />}
				</button>
			)}
		</div>
	);
}

export { Input };
