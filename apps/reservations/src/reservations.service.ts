import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(private readonly repository: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.repository.create(createReservationDto);
  }

  findAll(filterQuery: FilterQuery<any>) {
    return this.repository.find(filterQuery);
  }

  findOne(_id: string) {
    return this.repository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.repository.findOneAndUpdate({ _id }, updateReservationDto);
  }

  remove(_id: string) {
    return this.repository.findOneAndDelete({ _id });
  }
}
