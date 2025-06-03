import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, Matches } from 'class-validator';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'Email must be in a valid format',
  })
  @Transform(({ value }) => value.trim())
  email: string;

  @Transform(({ value }) => value.trim())
  @Prop({ required: true })
  password: string;

  @Prop()
  profilePhoto?: string;

  @Prop({ default: 'buyer' })
  role: 'buyer' | 'seller' | 'admin';

  @Prop({ default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
