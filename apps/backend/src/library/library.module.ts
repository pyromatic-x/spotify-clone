import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LibraryController } from "./library.controller";
import { Library, LibrarySchema } from "./library.schema";
import { LibraryService } from "./library.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Library.name, schema: LibrarySchema, collection: "library" },
		]),
	],
	controllers: [LibraryController],
	providers: [LibraryService],
	exports: [LibraryService],
})
export class LibraryModule {}
