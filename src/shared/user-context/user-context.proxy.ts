import { InjectableProxy } from 'nestjs-cls';

@InjectableProxy()
export class UserContext {
  username!: string;
  userId!: string;
}
