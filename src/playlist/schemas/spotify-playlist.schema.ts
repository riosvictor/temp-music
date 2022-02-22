import { Exclude, Expose, Type } from 'class-transformer';
import { SpotifyPlaylistItems } from './spotify-playlist-items.schema';

@Exclude()
export class SpotifyPlaylist {
  @Expose()
  @Type(() => SpotifyPlaylistItems)
  items: SpotifyPlaylistItems[];

  @Expose()
  limit: number;

  @Expose()
  offset: number;

  @Expose()
  total: number;
}
