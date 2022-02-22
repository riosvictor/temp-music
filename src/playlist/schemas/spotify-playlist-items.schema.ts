import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SpotifyPlaylistItems {
  @Expose()
  description: string;

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;
}
