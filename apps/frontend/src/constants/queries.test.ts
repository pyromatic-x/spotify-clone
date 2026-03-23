import { describe, expect, it } from "vitest";
import {
	QUERY_KEY_ALBUM_PAGE,
	QUERY_KEY_ARTIST,
	QUERY_KEY_ARTIST_LIKED_TRACKS,
	QUERY_KEY_ARTIST_PAGE,
	QUERY_KEY_GENRE_PAGE,
	QUERY_KEY_PLAYLIST_PAGE,
	QUERY_KEY_QUEUE,
	QUERY_KEY_SEARCH,
	QUERY_KEY_TRACK_NOW_PLAYING,
	QUERY_KEY_USER,
	QUERY_KEY_USER_PAGE,
} from "./queries";

describe("query key constants", () => {
	it("has correct static keys", () => {
		expect(QUERY_KEY_USER).toBe("USER");
		expect(QUERY_KEY_QUEUE).toBe("QUEUE");
	});
});

describe("query key factories", () => {
	it("QUERY_KEY_SEARCH builds correct key", () => {
		expect(QUERY_KEY_SEARCH("rock")).toBe("SEARCH/rock");
	});

	it("QUERY_KEY_ARTIST builds correct key", () => {
		expect(QUERY_KEY_ARTIST("abc")).toBe("ARTIST/abc");
	});

	it("QUERY_KEY_ARTIST_LIKED_TRACKS builds correct key", () => {
		expect(QUERY_KEY_ARTIST_LIKED_TRACKS("abc")).toBe(
			"ARTIST/LIKED-TRACKS/abc",
		);
	});

	it("QUERY_KEY_ARTIST_PAGE builds correct key", () => {
		expect(QUERY_KEY_ARTIST_PAGE("123")).toBe("ARTIST-PAGE/123");
	});

	it("QUERY_KEY_ALBUM_PAGE builds correct key", () => {
		expect(QUERY_KEY_ALBUM_PAGE("123")).toBe("ALBUM-PAGE/123");
	});

	it("QUERY_KEY_USER_PAGE builds correct key", () => {
		expect(QUERY_KEY_USER_PAGE("u1")).toBe("USER-PAGE/u1");
	});

	it("QUERY_KEY_PLAYLIST_PAGE builds correct key", () => {
		expect(QUERY_KEY_PLAYLIST_PAGE("p1")).toBe("PLAYLIST-PAGE/p1");
	});

	it("QUERY_KEY_GENRE_PAGE builds correct key", () => {
		expect(QUERY_KEY_GENRE_PAGE("g1")).toBe("GENRE-PAGE/g1");
	});

	it("QUERY_KEY_TRACK_NOW_PLAYING builds correct key", () => {
		expect(QUERY_KEY_TRACK_NOW_PLAYING("t1")).toBe("NOW-PLAYING/t1");
	});
});
