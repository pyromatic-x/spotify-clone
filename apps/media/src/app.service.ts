/** biome-ignore-all lint/style/useImportType: runtime import */

import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import * as sharp from "sharp";
import { ImageQueryDto } from "./dto/image-query.dto";

@Injectable()
export class AppService {
	private readonly logger = new Logger(AppService.name);

	async formatImage(path: string, { w, h, q, fit }: ImageQueryDto) {
		try {
			const resize: sharp.ResizeOptions = {};
			if (w) resize.width = w;
			if (h) resize.height = h;
			if (fit) resize.fit = fit;

			const format: { quality?: number } = {};
			if (q) format.quality = q;

			return await sharp(path)
				.resize(resize)
				.toFormat("jpeg", format)
				.toBuffer();
		} catch (err) {
			this.logger.error("Image processing failed", err);
			throw new BadRequestException("Image processing failed");
		}
	}
}
