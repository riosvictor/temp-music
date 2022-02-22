import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapIntegration } from '../integrations/open-weather-map.integration';
import { SpotifyIntegration } from '../integrations/spotify.integration';
import { PlaylistService } from '../playlist.service';
import { PlaylistParamsHelper } from './helpers/playlist-filter.helper';
import { SpotifyPlaylistResponseHelper } from './helpers/spotify-playlist-response.helper';
import { OpenWeatherServiceMock } from './mocks/openweather-integration.mock';
import { SpotifyServiceMock } from './mocks/spotify-integration.mock';

describe('PlaylistService', () => {
  let playlistService: PlaylistService;

  beforeEach(async () => {
    const OpenWeatherServiceProvider = {
      provide: OpenWeatherMapIntegration,
      useClass: OpenWeatherServiceMock,
    };

    const SpotifyServiceProvider = {
      provide: SpotifyIntegration,
      useClass: SpotifyServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        OpenWeatherServiceProvider,
        SpotifyServiceProvider,
      ],
    }).compile();

    playlistService = module.get<PlaylistService>(PlaylistService);
  });

  it('PlaylistService - should be defined', () => {
    expect(playlistService).toBeDefined();
  });

  describe('getPlaylist', () => {
    it('when receive param city', async () => {
      const expected = SpotifyPlaylistResponseHelper.createClass();
      const playlistParams = PlaylistParamsHelper.createClass();

      delete playlistParams.latitude;
      delete playlistParams.longitude;

      const result = await playlistService.getPlaylist(playlistParams);

      expect(result).toEqual(expected);
    });

    it('when receive param coordinates', async () => {
      const expected = SpotifyPlaylistResponseHelper.createClass();
      const playlistParams = PlaylistParamsHelper.createClass();

      delete playlistParams.city;

      const result = await playlistService.getPlaylist(playlistParams);

      expect(result).toEqual(expected);
    });

    it('when receive param coordinates', async () => {
      const playlistParams = {};

      try {
        await playlistService.getPlaylist(playlistParams);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
