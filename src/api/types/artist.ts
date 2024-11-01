export interface IArtist {
  id: string;
  name: string;
  image: string;
  backdrop: string;
  followers?: string;
  about?: {
    image: string;
    description: string;
    postedBy: string;
  };
  tours?: Array<{
    city: string;
    date: string;
    place: string;
  }>;
  listeners?: {
    monthly: string;
    world?: Array<{
      county: string;
      city: string;
      value: string;
    }>;
  };
  type: 'artist';
}

export type IArtistCard = Pick<IArtist, 'id' | 'name' | 'image' | 'type'>;
export type IArtistNowPlaying = Omit<IArtist, 'backdrop' | 'type' | 'image'>;
export type IArtistLibrary = Pick<IArtist, 'id' | 'name' | 'type'> & {
  image: string;
  addedAt: string;
  playedAt: string;
};
