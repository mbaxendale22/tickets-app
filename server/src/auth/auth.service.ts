import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type AccessToken = { access_token: string };

@Injectable()
export class AuthSevice {
  // gives access to prisma models and methods
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // generate password hash
      const hash = await argon.hash(dto.password);

      // save new user to the db
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
      });

      delete user.hash;

      return user;
    } catch (error) {
      // if the unique email constraint is violated i.e., the user already exists
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }
  }
  async login(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    //throw err if not
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    //compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);
    //throw err if password doesn't match
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    //send signed JWT back the user
    return this.signToken(user.id, user.email);
  }

  // create JWT
  async signToken(userId: number, email: string): Promise<AccessToken> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return { access_token: token };
  }
}
