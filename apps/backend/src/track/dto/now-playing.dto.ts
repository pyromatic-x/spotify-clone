import { ApiProperty } from "@nestjs/swagger";

export class NowPlaying {
	@ApiProperty({
		example: "6876567bfd8a1fd2be6cea7c",
	})
	_id: string;

	name: string;
	author: {
		_id: string;
		name: string;
		is_following: boolean;
		followers: number;
		about: {
			author: string;
			picture_url: string;
			text: string;
		};
		links: Array<{ service: string; link: string }>;
		listeners: {
			monthly: string;
			world: Array<{ city: string; value: string }>;
		};
	};
	album: {
		_id: string;
		name: string;
		picture_url: string;
		video_url: string;
	};
	credits: Array<{ role: string; name: string; _id?: string }>;
	in_library: boolean;
}
