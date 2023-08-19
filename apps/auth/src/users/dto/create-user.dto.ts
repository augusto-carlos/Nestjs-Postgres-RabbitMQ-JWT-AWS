import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserDocument } from '../models/user.schema';

export class CreateUserDto extends UserDocument {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
