import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub);
    if (user === null || user === undefined) {
      throw new UnauthorizedException('User not found');
    }
    return {
      _id: payload.sub,
      email: payload.email,
    };
  }
}

