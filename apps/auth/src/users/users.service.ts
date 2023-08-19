import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { FilterQuery } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.repository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.repository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }

  async verifyUser(email: string, password: string): Promise<any> {
    const user = await this.repository.findOne({ email });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
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
