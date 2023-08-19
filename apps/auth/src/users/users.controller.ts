import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FilterQuery } from 'mongoose';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Query() filterQuery: FilterQuery<any>) {
    return this.service.findAll(filterQuery);
  }

  @Delete()
  delete(_id: string) {
    return this.service.remove(_id);
  }
}
