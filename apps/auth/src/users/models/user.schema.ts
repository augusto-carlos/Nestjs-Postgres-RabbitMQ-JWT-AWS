import { AbstractDocument } from '@app/common';
import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  static readonly collectionName = 'users';

  @Prop()
  username: string;

  @Prop()
  password: string;
}
