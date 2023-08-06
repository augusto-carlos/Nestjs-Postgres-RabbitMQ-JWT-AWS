import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { FilterQuery } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll(filterQuery: FilterQuery<any>) {
    return this.repository.find(filterQuery);
  }

  findOne(_id: string) {
    return this.repository.findOne({ _id });
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.repository.findOneAndUpdate({ _id }, { $set: updateUserDto });
  }

  remove(_id: string) {
    return this.repository.findOneAndDelete({ _id });
  }
}
