import * as fs from "node:fs";
import { join, resolve } from "node:path";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { AUDIO_EXTENSIONS, IMAGE_EXTENSIONS, Paths } from "./constants";

const BASE_PATH = resolve(join(process.cwd(), "public"));

export const parseUrl = (url: string) => {
	const b64 = url.slice(1).split("?")[0];

	let decoded: string;
	try {
		decoded = atob(b64);
	} catch {
		throw new BadRequestException("Invalid base64 in URL");
	}

	const [shortcut, id] = decoded.split(":");

	if (!shortcut || !id) {
		throw new BadRequestException("Invalid URL format");
	}

	if (!(shortcut in Paths)) {
		throw new BadRequestException(`Unknown shortcut: "${shortcut}"`);
	}

	const mediaPath = Paths[shortcut as keyof typeof Paths];
	const resolvedPath = resolve(BASE_PATH, mediaPath, id);

	if (!resolvedPath.startsWith(BASE_PATH)) {
		throw new BadRequestException("Invalid path");
	}

	return { path: resolvedPath, type: mediaPath.split("/")[0] };
};

export async function getFileExtension(
	basePath: string,
	extensions: readonly string[],
): Promise<string | null> {
	for (const ext of extensions) {
		const extension = ext.startsWith(".") ? ext : `.${ext}`;
		try {
			await fs.promises.access(basePath + extension, fs.constants.F_OK);
			return extension;
		} catch {}
	}
	return null;
}

export async function getPathWithExtensionOrThrow(
	basePath: string,
	extensions: readonly string[],
): Promise<string> {
	const extension = await getFileExtension(basePath, extensions);

	if (!extension) throw new NotFoundException("Requested file not found");

	return basePath + extension;
}

export async function getImagePathWithExtensionOrThrow(path: string) {
	return getPathWithExtensionOrThrow(path, IMAGE_EXTENSIONS);
}

export async function getAudioPathWithExtensionOrThrow(path: string) {
	return getPathWithExtensionOrThrow(path, AUDIO_EXTENSIONS);
}
