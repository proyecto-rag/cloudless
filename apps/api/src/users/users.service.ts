import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleErrors } from 'src/utilities/handleErros';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      this.logger.log(`Creating user... ${createUserDto.username}`);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createData: Prisma.UserCreateInput = {
        ...createUserDto,
        // Default role is user
        role: Role.user,
        password: hashedPassword,
      };

      return this.prisma.user.create({
        data: createData,
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }

  async findAll() {
    try {
      this.logger.log('Finding all users...');
      return this.prisma.user.findMany({
        where: { active: true },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Finding user with id: ${id}`);
      const user = await this.prisma.user.findFirst({
        where: { id, active: true },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      this.logger.log(`Updating user with id: ${id}`);
      await this.findOne(id);

      const updateData: Prisma.UserUpdateInput = { ...updateUserDto };

      if (updateUserDto.password) {
        updateData.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      return this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`Removing user with id: ${id}`);
      await this.findOne(id);

      return this.prisma.user.update({
        where: { id },
        data: { active: false },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }
}
