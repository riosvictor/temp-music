import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenWeatherMapIntegration } from './integrations/open-weather-map.integration';
import { SpotifyIntegration } from './integrations/spotify.integration';
import { PlaylistParams } from './schemas/playlist-params.schema';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly weatherService: OpenWeatherMapIntegration,
    private readonly spotifyService: SpotifyIntegration,
  ) {}

  async getPlaylist(playlistParams: PlaylistParams) {
    let kelvinTemp = 0;

    const propertiesCount = Object.keys(playlistParams).length;

    if (propertiesCount === 0) {
      throw new BadRequestException('Params not provided!');
    }

    if (playlistParams.latitude && playlistParams.longitude) {
      const response = await this.weatherService.latLongRequest(
        playlistParams.latitude,
        playlistParams.longitude,
      );

      kelvinTemp = response.main.temp;
    }

    if (playlistParams.city) {
      const response = await this.weatherService.cityNameRequest(
        playlistParams.city,
      );

      kelvinTemp = response.main.temp;
    }

    const celsiusTemp = this.convertKelvinToCelsius(kelvinTemp);

    if (celsiusTemp > 30) {
      return this.spotifyService.getPlayListByGenre('dance');
    }

    if (celsiusTemp >= 15 && celsiusTemp <= 30) {
      return this.spotifyService.getPlayListByGenre('pop');
    }

    if (celsiusTemp >= 10 && celsiusTemp < 15) {
      return this.spotifyService.getPlayListByGenre('rock');
    }

    return this.spotifyService.getPlayListByGenre('classical');
  }

  private convertKelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }
}
