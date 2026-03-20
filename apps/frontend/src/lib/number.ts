export function toNumberWithDigits(
	val: string | number,
	divider: "," | "." = ",",
) {
	if (Number.isNaN(Number(val))) return "";

	return String(val)
		.split("")
		.reverse()
		.map((n, index) => (index % 3 === 0 && index !== 0 ? n + divider : n))
		.reverse()
		.join("");
}
