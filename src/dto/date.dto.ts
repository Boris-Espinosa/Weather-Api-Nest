import { IsOptional, Matches } from 'class-validator';

export class WeatherQueryDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date1 must be in format yyyy-mm-dd',
  })
  date1?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date2 must be in format yyyy-mm-dd',
  })
  date2?: string;
}
