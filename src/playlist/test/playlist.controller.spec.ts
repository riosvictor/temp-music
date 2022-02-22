import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapIntegration } from '../integrations/open-weather-map.integration';
import { SpotifyIntegration } from '../integrations/spotify.integration';
import { PlaylistController } from '../playlist.controller';
import { PlaylistService } from '../playlist.service';
import { SpotifyPlaylistResponse } from '../schemas/spotify-playlist-response.schema';
import { PlaylistParamsHelper } from './helpers/playlist-filter.helper';
import { SpotifyPlaylistResponseHelper } from './helpers/spotify-playlist-response.helper';

describe('PlayListController', () => {
  let playlistController: PlaylistController;
  let playlistService: PlaylistService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PlaylistController],
      providers: [
        PlaylistService,
        OpenWeatherMapIntegration,
        SpotifyIntegration,
      ],
    }).compile();

    playlistController = app.get<PlaylistController>(PlaylistController);
    playlistService = app.get<PlaylistService>(PlaylistService);
  });

  describe('getPlaylist', () => {
    it('should return a playlist', async () => {
      const expected = SpotifyPlaylistResponseHelper.createClass();
      const playlistParams = PlaylistParamsHelper.createClass();

      const result = new Promise<SpotifyPlaylistResponse>((resolve) =>
        resolve(expected),
      );

      jest
        .spyOn(playlistService, 'getPlaylist')
        .mockImplementation(() => result);

      expect(
        await playlistController.getPlayList(playlistParams),
      ).toStrictEqual(expected);
    });
  });
});
