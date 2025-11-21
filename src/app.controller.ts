import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { WeatherQueryDto } from './dto/date.dto';

@Controller('/cache')
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:cityName')
  //@SkipThrottle()
  async WeatherData(
    @Param('cityName') cityName: string,
    @Query(new ValidationPipe())
    query: WeatherQueryDto,
  ) {
    return this.appService.fetchWeather(cityName, query.date1, query.date2);
  }
}
