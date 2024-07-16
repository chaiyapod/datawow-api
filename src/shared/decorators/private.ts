import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PRIVATE_API = 'isPrivate';
export const Private = (): CustomDecorator<string> =>
  SetMetadata(IS_PRIVATE_API, true);
