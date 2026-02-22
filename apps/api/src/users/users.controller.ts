import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '@repo/shared';
import type {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '@repo/shared';
import { ZodValidationPipe } from '../common/pipes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  loginUser(
    @Body(new ZodValidationPipe(loginUserSchema)) loginUserDto: LoginUserInput,
  ) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createUserSchema))
    createUserDto: CreateUserInput,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema))
    updateUserDto: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
