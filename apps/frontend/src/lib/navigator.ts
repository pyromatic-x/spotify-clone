export const getOS = () => {
	const platform = window.navigator.platform;
	const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
	const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
	let os: "unknown" | "Mac OS" | "Windows" | "Android" | "Linux" = "unknown";

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = "Mac OS";
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = "Windows";
	} else if (/Android/.test(navigator.userAgent)) {
		os = "Android";
	} else if (/Linux/.test(platform)) {
		os = "Linux";
	}

	return os;
};
