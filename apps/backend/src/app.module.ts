import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AlbumModule } from "./album/album.module";
import { AppController } from "./app.controller";
import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { LibraryModule } from "./library/library.module";
import { PersonalModule } from "./personal/personal.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { SearchModule } from "./search/search.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),

		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				uri: config.getOrThrow<string>("MONGO_CONNECTION_STRING"),
				dbName: config.get<string>("MONGO_DB_NAME", "spotify-clone"),
				autoIndex: config.get<string>("NODE_ENV") !== "production",
			}),
		}),

		CacheModule.register({
			isGlobal: true,
		}),

		JwtModule.registerAsync({
			global: true,
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.getOrThrow<string>("JWT_SECRET"),
				signOptions: {
					expiresIn: config.get<string>("JWT_EXPIRES_IN", "24h"),
				},
			}),
		}),

		ThrottlerModule.forRoot({
			throttlers: [{ ttl: 60_000, limit: 60 }],
		}),

		AuthModule,
		UserModule,
		LibraryModule,
		PlaylistModule,
		AlbumModule,
		PersonalModule,
		SearchModule,
	],

	controllers: [AppController],

	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
