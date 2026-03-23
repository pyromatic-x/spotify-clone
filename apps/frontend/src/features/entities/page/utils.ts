export const calcPageHeadingSize = ({
	text,
	width,
}: {
	text: string;
	width: number;
}): number => {
	const min = 32;
	const max = 96;

	const AVERAGE_CHAR_WIDTH_RATIO = 1;

	const textLength = text.length;

	if (textLength === 0) return max;

	const calculatedSize = Math.floor(
		width / (textLength * AVERAGE_CHAR_WIDTH_RATIO),
	);

	return Math.max(min, Math.min(calculatedSize, max));
};
