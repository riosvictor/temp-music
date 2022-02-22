import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import { SpotifyPlaylistResponse } from '../schemas/spotify-playlist-response.schema';
import { SpotifyTokenResponse } from '../schemas/spotify-token-response.schema';

@Injectable()
export class SpotifyIntegration {
  private clientId: string;
  private clientSecret: string;
  private token: string;

  constructor(private http: HttpService) {
    this.clientId = '4d8f63b3e1894c73a9d6fa0e7085e60f';
    this.clientSecret = '6dd251a17f9a422b9ba04175438ad8ab';
  }

  private async authenticate(): Promise<SpotifyTokenResponse> {
    const basicToken = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');
    const queryString = new URLSearchParams();

    queryString.append('grant_type', 'client_credentials');

    const observable = this.http.post<SpotifyTokenResponse>(
      `https://accounts.spotify.com/api/token`,
      queryString,
      {
        headers: {
          Content_Type: 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicToken}`,
        },
      },
    );

    const axiosResponse = await lastValueFrom(observable);

    return axiosResponse.data;
  }

  private async getToken(): Promise<string> {
    if (!this.token) {
      const response = await this.authenticate();

      this.token = response.access_token;
    }

    return this.token;
  }

  async getPlayListByGenre(genre: string): Promise<SpotifyPlaylistResponse> {
    const token = await this.getToken();

    console.log(token);

    const observable = this.http.get<SpotifyPlaylistResponse>(
      `https://api.spotify.com/v1/search?q=name:${genre}&type=playlist`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const axiosResponse = await lastValueFrom(observable);

    const playlists = axiosResponse.data;

    return plainToClass(SpotifyPlaylistResponse, playlists);
  }
}
