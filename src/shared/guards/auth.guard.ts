import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { ClsService } from 'nestjs-cls';
import { IS_PRIVATE_API } from '../decorators/private';
import { UserToken } from '../types';

declare module 'express' {
  interface Request {
    user?: UserToken;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(ClsService)
    private readonly cls: ClsService,
    private readonly reflector: Reflector,
  ) {}

  private readonly logger = new Logger(AuthGuard.name);

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    if (!this.isPrivateRoute(ctx)) {
      return true;
    }

    const req: Request = ctx.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(ctx);

    try {
      const payload = await this.verifyToken(token);

      req.user = payload as UserToken;

      this.cls.set('userId', payload.sub);
      this.cls.set('username', payload.username);

      return true;
    } catch (error) {
      console.log(error);
      this.logger.error({ error });
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Unauthorized', {
          cause: error.stack,
          description: error.message,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  private verifyToken(token: string): Promise<UserToken> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env['JWT_SECRET'] || '', (error, decode) => {
        if (error) reject(error);
        resolve(decode as UserToken);
      });
    });
  }

  private isPrivateRoute(ctx: ExecutionContext): boolean {
    return this.reflector.get<boolean>(IS_PRIVATE_API, ctx.getHandler());
  }

  private extractTokenFromHeader(ctx: ExecutionContext): string {
    const req: Request = ctx.switchToHttp().getRequest();

    const clientToken = req.headers.authorization;

    if (!clientToken) {
      throw new UnauthorizedException('Unauthorized', {
        cause: new Error(),
        description: 'invalid session token',
      });
    }

    return clientToken.split(' ')[1];
  }
}
