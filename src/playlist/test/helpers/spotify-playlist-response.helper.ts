import { plainToClass } from 'class-transformer';
import { SpotifyPlaylistResponse } from '../../schemas/spotify-playlist-response.schema';

export class SpotifyPlaylistResponseHelper {
  private static plain = {
    playlists: {
      limit: 1,
      offset: 1,
      total: 1,
      items: [
        {
          description: 'test description',
          id: 'test-id',
          name: 'test name',
          type: 'playlist',
        },
      ],
    },
  };

  static createClass() {
    return plainToClass(
      SpotifyPlaylistResponse,
      SpotifyPlaylistResponseHelper.plain,
    );
  }
}
