import { Type } from "class-transformer";
import {
	IsBoolean,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";

class QualitySettingsDto {
	@IsOptional()
	@IsString()
	streaming?: string;

	@IsOptional()
	@IsBoolean()
	normalize?: boolean;
}

class LibrarySettingsDto {
	@IsOptional()
	@IsBoolean()
	compact?: boolean;
}

class DisplaySettingsDto {
	@IsOptional()
	@IsBoolean()
	show_now_playing?: boolean;

	@IsOptional()
	@IsBoolean()
	show_canvas?: boolean;
}

class SocialSettingsDto {
	@IsOptional()
	@IsBoolean()
	show_playlists?: boolean;

	@IsOptional()
	@IsBoolean()
	show_following?: boolean;

	@IsOptional()
	@IsBoolean()
	share_activity?: boolean;
}

export class UpdateSettingsDto {
	@IsOptional()
	@IsString()
	language?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => QualitySettingsDto)
	quality?: QualitySettingsDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => LibrarySettingsDto)
	library?: LibrarySettingsDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => DisplaySettingsDto)
	display?: DisplaySettingsDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => SocialSettingsDto)
	social?: SocialSettingsDto;
}
