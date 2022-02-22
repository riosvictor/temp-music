import { SpotifyPlaylistResponse } from '../../schemas/spotify-playlist-response.schema';
import { SpotifyPlaylistResponseHelper } from '../helpers/spotify-playlist-response.helper';

export class SpotifyServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPlayListByGenre(lat: number, long: number): SpotifyPlaylistResponse {
    return SpotifyPlaylistResponseHelper.createClass();
  }
}
