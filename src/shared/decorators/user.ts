import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { UserToken } from '../types';

export const User = createParamDecorator(
  (data: keyof UserToken, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return data ? request.user?.[data] : request.user;
  },
);
