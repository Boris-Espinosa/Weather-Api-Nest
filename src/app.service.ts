import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async fetchWeather(
    cityName: string,
    date1: string | undefined,
    date2: string | undefined,
  ) {
    const API_KEY = this.configService.get<string>('API_KEY');
    const API_URL = this.configService.get<string>('API_URL');

    const reqUrl = date1
      ? date2
        ? `${cityName}/${date1}/${date2}`
        : `${cityName}/${date1}`
      : `${cityName}`;

    const res = await fetch(`${API_URL}/${reqUrl}?key=${API_KEY}`);
    if (!res.ok) {
      const text = await res.text();
      throw new HttpException(text, res.status);
    }
    const resJson = await res.json();
    return resJson;
  }
}
