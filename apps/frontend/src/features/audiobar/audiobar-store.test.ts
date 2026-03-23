import { act } from "@testing-library/react";
import { useAudiobar } from "./audiobar-store";

vi.spyOn(console, "log").mockImplementation(() => {});

const mockTrack = (id: string) => ({
	_id: id,
	name: `Track ${id}`,
	duration: 200,
	audio_url: "",
	picture_url: "",
	accent: "#000",
	author: { _id: "a1", name: "Artist" },
	album: { _id: "al1", name: "Album" },
});

describe("useAudiobar", () => {
	beforeEach(() => {
		act(() => {
			useAudiobar.setState({
				source: {} as any,
				tracks: [],
				track: null,
				shuffle: false,
				repeat: false,
			});
		});
	});

	describe("toggle", () => {
		it("toggles shuffle on", () => {
			act(() => useAudiobar.getState().toggle("shuffle"));
			expect(useAudiobar.getState().shuffle).toBe(true);
		});

		it("toggles shuffle off", () => {
			act(() => useAudiobar.getState().toggle("shuffle"));
			act(() => useAudiobar.getState().toggle("shuffle"));
			expect(useAudiobar.getState().shuffle).toBe(false);
		});

		it("toggles repeat independently of shuffle", () => {
			act(() => useAudiobar.getState().toggle("shuffle"));
			act(() => useAudiobar.getState().toggle("repeat"));
			expect(useAudiobar.getState().shuffle).toBe(true);
			expect(useAudiobar.getState().repeat).toBe(true);
		});
	});

	describe("next", () => {
		it("moves to next track", () => {
			const tracks = [mockTrack("1"), mockTrack("2"), mockTrack("3")] as any;
			act(() => {
				useAudiobar.setState({ tracks, track: tracks[0] });
			});
			act(() => useAudiobar.getState().next());
			expect(useAudiobar.getState().track?._id).toBe("2");
		});

		it("wraps to first track when at end", () => {
			const tracks = [mockTrack("1"), mockTrack("2")] as any;
			act(() => {
				useAudiobar.setState({ tracks, track: tracks[1] });
			});
			act(() => useAudiobar.getState().next());
			expect(useAudiobar.getState().track?._id).toBe("1");
		});

		it("does nothing when track is null", () => {
			act(() => useAudiobar.getState().next());
			expect(useAudiobar.getState().track).toBeNull();
		});
	});

	describe("prev", () => {
		it("moves to previous track", () => {
			const tracks = [mockTrack("1"), mockTrack("2"), mockTrack("3")] as any;
			act(() => {
				useAudiobar.setState({ tracks, track: tracks[2] });
			});
			act(() => useAudiobar.getState().prev());
			expect(useAudiobar.getState().track?._id).toBe("2");
		});

		it("wraps to last track when at beginning", () => {
			const tracks = [mockTrack("1"), mockTrack("2")] as any;
			act(() => {
				useAudiobar.setState({ tracks, track: tracks[0] });
			});
			act(() => useAudiobar.getState().prev());
			expect(useAudiobar.getState().track?._id).toBe("2");
		});
	});

	describe("change", () => {
		it("sets track by id", () => {
			const tracks = [mockTrack("1"), mockTrack("2")] as any;
			act(() => {
				useAudiobar.setState({ tracks });
			});
			act(() => useAudiobar.getState().change("2"));
			expect(useAudiobar.getState().track?._id).toBe("2");
		});

		it("does nothing for unknown id", () => {
			const tracks = [mockTrack("1")] as any;
			act(() => {
				useAudiobar.setState({ tracks, track: null });
			});
			act(() => useAudiobar.getState().change("999"));
			expect(useAudiobar.getState().track).toBeNull();
		});

		it("does nothing when tracks is empty", () => {
			act(() => useAudiobar.getState().change("1"));
			expect(useAudiobar.getState().track).toBeNull();
		});
	});
});
