export function formatDuration(value?: number) {
	if (!value && value !== 0) return "-:--";

	const minute = Math.floor(value / 60);
	const secondLeft = Math.floor(value - minute * 60);
	return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}
