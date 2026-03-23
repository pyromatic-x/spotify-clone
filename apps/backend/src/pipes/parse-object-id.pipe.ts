import {
	type ArgumentMetadata,
	Injectable,
	type PipeTransform,
} from "@nestjs/common";
import { toObjectId } from "src/utils";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
	transform(value: string, _metadata: ArgumentMetadata): string {
		toObjectId(value);
		return value;
	}
}
