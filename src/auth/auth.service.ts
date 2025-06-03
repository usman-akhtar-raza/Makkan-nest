import { UserService } from '../user/user.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signupdto/signup.dto';
import { VerifyOtpDto } from './dto/signupdto/verify-otp.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async generateOpt(dto: SignUpDto) {
    try {
      const existing = await this.userService.findByEmail(dto.email);
      if (existing) throw new BadRequestException('Email already registered');

      const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

      // await this.mailerService.sendOtpEmail(dto.email, otp);
      return {
        otp,
        message: 'OTP sent to your email. Complete signup after verifying OTP.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send OTP',
        error.message,
      );
    }
  }

  async completeSignup(dto: VerifyOtpDto) {
    try {

      const existing = await this.userService.findByEmail(dto.email);
      console.log(existing, 'existing check');

      if (existing) {
        throw new BadRequestException('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.userService.createUser({
        ...dto,
        password: hashedPassword,
      });
    //   console.log(user);

      const token = this.generateToken(user);

      return {
        message: 'Signup successful',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        _id: user._id,
        access_token: token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed complete registeration',
        error.message,
      );
    }
  }

  private generateToken(user: any): string {
    const payload = {
      sub: user._id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
