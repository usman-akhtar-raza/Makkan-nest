import { IsEmail, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignUpDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  // @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
  //   message: 'Email must be in a valid format',
  // })
  @Transform(({ value }) => value.trim())
  email: string;
}
