import { HttpException, Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class AppService {
  async fetchWeather(
    cityName: string,
    date1: string | undefined,
    date2: string | undefined,
  ) {
    const API_KEY = process.env.API_KEY;
    const API_URL = process.env.API_URL;

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
