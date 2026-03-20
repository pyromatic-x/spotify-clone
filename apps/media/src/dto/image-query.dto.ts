import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";

const VALID_FITS = ["cover", "contain", "fill", "inside", "outside"] as const;

export class ImageQueryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(4096)
	w?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(4096)
	h?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(100)
	q?: number;

	@IsOptional()
	@IsIn(VALID_FITS)
	fit?: (typeof VALID_FITS)[number];
}
