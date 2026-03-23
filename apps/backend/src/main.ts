import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

const REQUIRED_ENV_VARS = ["MONGO_CONNECTION_STRING", "JWT_SECRET"] as const;

function validateEnv() {
	const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
	if (missing.length) {
		throw new Error(
			`Missing required environment variables: ${missing.join(", ")}`,
		);
	}
}

async function bootstrap() {
	validateEnv();

	const app = await NestFactory.create(AppModule, {
		logger: ["error", "warn", "log"],
	});

	const configService = app.get(ConfigService);

	const corsOrigin = configService.get<string>("CORS_ORIGIN");

	app.enableCors({
		origin: corsOrigin ? corsOrigin.split(",") : true,
		credentials: true,
	});

	app.use(helmet());
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const config = new DocumentBuilder()
		.setTitle("spotify clone backend")
		.setVersion("1.0")
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, documentFactory);

	const port = configService.get<number>("PORT", 3001);

	await app.listen(port, "0.0.0.0");
	Logger.log(`Server is running on port: ${port}`, "Bootstrap");
}

bootstrap().catch((err) => {
	Logger.error(err, "Bootstrap");
	process.exit(1);
});
