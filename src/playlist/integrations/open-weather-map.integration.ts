import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { OpenWeatherResponse } from '../schemas/open-weather-response.schema';

@Injectable()
export class OpenWeatherMapIntegration {
  private apiKey: string;

  constructor(private http: HttpService) {
    this.apiKey = 'b77e07f479efe92156376a8b07640ced';
  }

  async latLongRequest(
    lat: number,
    long: number,
  ): Promise<OpenWeatherResponse> {
    try {
      const observable = this.http.get<OpenWeatherResponse>(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`,
      );

      const axiosResponse = await lastValueFrom(observable);

      return axiosResponse.data;
    } catch (e) {
      throw new BadRequestException(e.response.data.message);
    }
  }

  async cityNameRequest(city: string): Promise<OpenWeatherResponse> {
    try {
      const observable = this.http.get<OpenWeatherResponse>(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`,
      );

      const axiosResponse = await lastValueFrom(observable);

      return axiosResponse.data;
    } catch (e) {
      throw new BadRequestException(e.response.data.message);
    }
  }
}
