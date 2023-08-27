import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { FilterQuery } from 'mongoose';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly repository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    this.paymentsService
      .send('create_change', {
        ...createReservationDto.charge,
        email,
      })
      .subscribe({
        next: (paymentIntent) => {
          this.repository.create({
            ...createReservationDto,
            invoiceId: paymentIntent.id,
            userId,
          });
        },
        error(err) {
          console.log(err);
        },
      });
  }

  findAll(filterQuery: FilterQuery<any>) {
    return this.repository.find(filterQuery);
  }

  findOne(_id: string) {
    return this.repository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.repository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.repository.findOneAndDelete({ _id });
  }
}
