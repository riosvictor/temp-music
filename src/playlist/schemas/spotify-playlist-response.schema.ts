import { Exclude, Expose, Type } from 'class-transformer';
import { SpotifyPlaylist } from './spotify-playlist.schema';

@Exclude()
export class SpotifyPlaylistResponse {
  @Expose()
  @Type(() => SpotifyPlaylist)
  playlists: SpotifyPlaylist;
}
