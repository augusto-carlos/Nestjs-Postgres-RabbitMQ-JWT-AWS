import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  static readonly collectionName = 'reservations';

  @Prop()
  startDate: Date;

  @Prop()
  name: string;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
