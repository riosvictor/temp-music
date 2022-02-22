import { OpenWeatherResponse } from '../../schemas/open-weather-response.schema';

export class OpenWeatherServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  latLongRequest(lat: number, long: number): OpenWeatherResponse {
    return {
      main: {
        temp: 277,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cityNameRequest(city: string): OpenWeatherResponse {
    return {
      main: {
        temp: 353,
      },
    };
  }
}
