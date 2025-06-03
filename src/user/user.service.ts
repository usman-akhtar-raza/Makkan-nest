import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VerifyOtpDto } from 'src/auth/dto/signupdto/verify-otp.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    // console.log('finding by email', email);
    return this.userModel.findOne({ email: email });
  }

  async createUser(dto: VerifyOtpDto) {
    try {
      const userExists = await this.userModel.findOne({ email: dto.email });
      if (userExists) {
        throw new BadRequestException('Email already in use');
      }

      const user = new this.userModel({
        ...dto,
      });

      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user',
        error.message,
      );
    }
  }
}
