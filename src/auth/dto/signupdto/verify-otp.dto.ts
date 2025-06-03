import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: 'buyer' | 'admin' |'seller';

  @IsString()
  @IsNotEmpty()
  profilePicture: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
