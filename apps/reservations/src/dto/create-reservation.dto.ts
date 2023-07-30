import { ReservationDocument } from '../models/reservation.schema';

export interface CreateReservationDto extends ReservationDocument {
  startDate: Date;
  endDate: Date;
  placeId: string;
  invoiceId: string;
}
