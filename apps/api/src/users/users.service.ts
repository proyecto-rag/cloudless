import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { handleErrors } from 'src/utilities/handleErros';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
  UserResponse,
  UserLoginResponse,
  UserAuthStatus,
} from '@repo/shared';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  checkAuthStatus(user: User): UserAuthStatus {
    const { email, username } = user;
    return {
      email,
      username,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async loginUser(loginUserDto: LoginUserInput): Promise<UserLoginResponse> {
    try {
      this.logger.log(`Logging in user... ${loginUserDto.email}`);
      const user = await this.prisma.user.findFirst({
        where: { email: loginUserDto.email },
      });
      if (!user || !user.active) {
        throw new UnauthorizedException(`Invalid credentials`);
      }
      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const userResponse: UserResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return {
        user: userResponse,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.logger.error(error);
      throw handleErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async create(createUserDto: CreateUserInput): Promise<UserResponse> {
    try {
      this.logger.log(`Creating user... ${createUserDto.username}`);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createData: Prisma.UserCreateInput = {
        ...createUserDto,
        role: Role.user,
        password: hashedPassword,
      };

      const user = await this.prisma.user.create({
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

      return user as UserResponse;
    } catch (error) {
      this.logger.error(error);
      throw handleErrors(error);
    }
  }

  async findAll(): Promise<UserResponse[]> {
    try {
      this.logger.log('Finding all users...');
      const users = await this.prisma.user.findMany({
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

      return users as UserResponse[];
    } catch (error) {
      this.logger.error(error);
      throw handleErrors(error);
    }
  }

  async findOne(id: string): Promise<UserResponse> {
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

      return user as UserResponse;
    } catch (error) {
      this.logger.error(error);
      throw handleErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserInput): Promise<UserResponse> {
    try {
      this.logger.log(`Updating user with id: ${id}`);
      await this.findOne(id);

      const updateData: Prisma.UserUpdateInput = { ...updateUserDto };

      if (updateUserDto.password) {
        updateData.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const user = await this.prisma.user.update({
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

      return user as UserResponse;
    } catch (error) {
      this.logger.error(error);
      throw handleErrors(error);
    }
  }

  async remove(id: string): Promise<UserResponse> {
    try {
      this.logger.log(`Removing user with id: ${id}`);
      await this.findOne(id);

      const user = await this.prisma.user.update({
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

      return user as UserResponse;
    } catch (error) {
      this.logger.error(error);
      throw handleErrors(error);
    }
  }
}
