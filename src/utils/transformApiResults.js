import { randomColor } from "./strings";

function getImage(item, small = false) {
  const images = item.type === "track" ? item.album.images : item.images;
  if (!images || !images.length) return null;

  if (images.length >= 2) return images[small ? 2 : 1].url;
  return images[0].url;
}

export default function transform(items, type, smallImage) {
  const maps = {
    categories(category) {
      return {
        id: category.id,
        title: category.name,
        image: category.icons[0].url,
        color: randomColor(),
      };
    },
    artists(artist) {
      return {
        id: artist.id,
        title: artist.name || artist.id,
        subTitle: "Artist",
        image: getImage(artist, smallImage),
        popularity: artist.popularity,
        color: randomColor(),
        type,
      };
    },
    albums(album) {
      return {
        id: album.id,
        title: album.name || album.id,
        subTitle:
          album.release_date.slice(0, 4) + " ⏺ " + album.artists[0].name,
        author: album?.artists[0]?.name,
        image: getImage(album, smallImage),
        color: randomColor(),
        type,
      };
    },
    playlists(playlist) {
      return {
        id: playlist.id,
        title: playlist.name || playlist.id,
        subTitle: "By " + playlist.owner.display_name,
        author: playlist?.owner?.display_name || playlist?.owner?.id,
        image: getImage(playlist, smallImage),
        color: randomColor(),
        type,
      };
    },
    tracks(track) {
      return {
        id: track.id,
        name: track.name,
        authors: track.artists.map((artist) => artist.name || artist.id),
        image: getImage(track, smallImage),
        explicit: track.explicit,
        duration: Math.ceil(track.duration_ms / 1000),
        color: randomColor(),
        type,
      };
    },
    episodes(episode) {
      const duration = Math.ceil(episode.duration_ms / 1000 / 60);
      const date = new Date(episode.release_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      return {
        id: episode.id,
        title: episode.name,
        subTitle: date + " ⏺ " + duration + " min",
        image: getImage(episode, smallImage),
        color: randomColor(),
        type,
      };
    },
    podcasts(podcast) {
      return {
        id: podcast.id,
        title: podcast.name,
        subTitle: podcast.publisher,
        image: getImage(podcast, smallImage),
        color: randomColor(),
        type,
      };
    },
  };

  // for some reason Spotify returns array with null values
  return (items || []).filter((i) => i).map(maps[type]);
}
