import { HeaderLeft } from "./left";
import { HeaderMiddle } from "./middle";
import { HeaderRight } from "./right";

export const HeaderModule = () => {
	return (
		<div
			className="[grid-area:header] grid min-h-12 max-h-12"
			style={{
				gridTemplateColumns: "auto minmax(auto, 540px) auto",
			}}
		>
			<HeaderLeft />
			<HeaderMiddle />
			<HeaderRight />
		</div>
	);
};
