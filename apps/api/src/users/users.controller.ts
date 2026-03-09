import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
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
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decoratos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  loginUser(
    @Body(new ZodValidationPipe(loginUserSchema)) loginUserDto: LoginUserInput,
  ) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Get('auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: Omit<User, 'password'>) {
    return this.usersService.checkAuthStatus(user);
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
