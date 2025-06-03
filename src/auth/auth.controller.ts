import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signupdto/signup.dto';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/signupdto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {

    const result = await this.authService.generateOpt(dto);
    return result;
  }

  @Post('verify-otp')

  async verifyOtp(@Body()dto: VerifyOtpDto) {

    const result = await this.authService.completeSignup(dto);

    return result
  }
}
