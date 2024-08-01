import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  picture?: string;

  // Agrega otros campos según sea necesario
}

export const UserSchema = SchemaFactory.createForClass(User);
