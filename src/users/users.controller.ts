import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService, User } from './users.service';

interface CreateUserDto {
  name: string;
  age: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    const userId = parseInt(id, 10);
    return this.usersService.findOne(userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }
}
