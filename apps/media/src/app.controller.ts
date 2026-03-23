/** biome-ignore-all lint/style/useImportType: runtime import */
import * as fs from "node:fs";
import {
	BadRequestException,
	Controller,
	Get,
	Head,
	Header,
	HttpCode,
	HttpException,
	HttpStatus,
	Logger,
	NotFoundException,
	Query,
	Req,
	Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AppService } from "./app.service";
import { ImageQueryDto } from "./dto/image-query.dto";
import {
	getAudioPathWithExtensionOrThrow,
	getImagePathWithExtensionOrThrow,
	parseUrl,
} from "./utils";

const AUDIO_MIME: Record<string, string> = {
	".mp3": "audio/mpeg",
	".wav": "audio/wav",
	".aac": "audio/aac",
	".flac": "audio/flac",
	".ogg": "audio/ogg",
	".aiff": "audio/aiff",
	".m4a": "audio/mp4",
};

@Controller()
export class AppController {
	private readonly logger = new Logger(AppController.name);

	constructor(private readonly service: AppService) {}

	@HttpCode(HttpStatus.OK)
	@Head()
	ping() {}

	@Get("*")
	@Header("Accept-Ranges", "bytes")
	async getFile(
		@Req() request: Request,
		@Res() response: Response,
		@Query() query: ImageQueryDto,
	) {
		this.logger.log(`[GET]: ${request.url.slice(1)}`);

		try {
			const { path, type } = parseUrl(request.url);

			if (type === "images") {
				return await this.handleImage(path, query, response);
			}

			if (type === "audio") {
				return await this.handleAudio(path, request, response);
			}

			throw new NotFoundException("Unknown media type");
		} catch (err) {
			if (err instanceof HttpException) throw err;
			this.logger.error("Unexpected error", err);
			throw new NotFoundException("Resource not found");
		}
	}

	private async handleImage(
		path: string,
		query: ImageQueryDto,
		response: Response,
	) {
		const filePath = await getImagePathWithExtensionOrThrow(path);
		const buffer = await this.service.formatImage(filePath, query);

		response.type("image/jpeg");
		response.send(buffer);
	}

	private async handleAudio(
		path: string,
		request: Request,
		response: Response,
	) {
		const filePath = await getAudioPathWithExtensionOrThrow(path);
		const stat = await fs.promises.stat(filePath);
		const size = stat.size;
		const range = request.headers.range;

		const ext = filePath.substring(filePath.lastIndexOf("."));
		const contentType = AUDIO_MIME[ext] || "audio/mpeg";

		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = Number.parseInt(parts[0], 10);
			const end = parts[1] ? Number.parseInt(parts[1], 10) : size - 1;

			if (
				Number.isNaN(start) ||
				Number.isNaN(end) ||
				start < 0 ||
				end >= size ||
				start > end
			) {
				throw new BadRequestException("Invalid Range header");
			}

			const chunkSize = end - start + 1;
			const stream = fs.createReadStream(filePath, { start, end });

			stream.on("error", (err) => {
				this.logger.error("Stream read error", err);
				if (!response.headersSent) {
					response.status(500).end();
				}
				stream.destroy();
			});

			response.on("close", () => stream.destroy());

			response.writeHead(206, {
				"content-range": `bytes ${start}-${end}/${size}`,
				"content-length": chunkSize,
				"content-type": contentType,
			});

			stream.pipe(response);
		} else {
			const stream = fs.createReadStream(filePath);

			stream.on("error", (err) => {
				this.logger.error("Stream read error", err);
				if (!response.headersSent) {
					response.status(500).end();
				}
				stream.destroy();
			});

			response.on("close", () => stream.destroy());

			response.writeHead(200, {
				"content-length": size,
				"content-type": contentType,
			});

			stream.pipe(response);
		}
	}
}
