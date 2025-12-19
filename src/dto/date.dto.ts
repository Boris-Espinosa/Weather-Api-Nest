import {
  IsOptional,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsDateAfter', async: false })
export class IsDateAfterConstraint implements ValidatorConstraintInterface {
  validate(date2: string, args: ValidationArguments) {
    const object = args.object as WeatherQueryDto;
    if (!object.date1 || !date2) {
      return true;
    }
    const d1 = new Date(object.date1);
    const d2 = new Date(date2);
    return d2 >= d1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'date2 must be equal to or after date1';
  }
}

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
  @Validate(IsDateAfterConstraint)
  date2?: string;
}
