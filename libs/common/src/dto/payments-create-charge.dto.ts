import { CreateChargeDto } from './create-charge.dto';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
