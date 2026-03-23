import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger("Bootstrap");

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.enableCors({
		origin: true,
		methods: ["GET"],
		allowedHeaders: [
			"Range",
			"Content-Type",
			"Content-Length",
			"Content-Range",
		],
	});

	const port = process.env.PORT || 3002;

	await app.listen(port, "0.0.0.0");
	logger.log(`Server is running on port: ${port}`);
}

bootstrap().catch((err) => {
	console.error("Failed to start application", err);
	process.exit(1);
});
