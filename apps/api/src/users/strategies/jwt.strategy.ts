import { PassportStrategy } from '@nestjs/passport';
import { Strategy, JwtFromRequestFunction } from 'passport-jwt';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { User } from '@prisma/client';
import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    configService: ConfigService,
  ) {
    const jwtFromRequest: JwtFromRequestFunction = (request) => {
      const authorization = (request as Request)?.headers?.authorization;
      if (!authorization) return null;
      const [scheme, token] = authorization.split(' ');
      if (scheme?.toLowerCase() !== 'bearer') return null;
      return token ?? null;
    };

    super({
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
      jwtFromRequest,
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
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

    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.active) {
      throw new UnauthorizedException('User is inactive, talk with an admin');
    }

    return user;
  }
}
