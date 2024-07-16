import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { UserContext } from './user-context.proxy';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      proxyProviders: [UserContext],
    }),
  ],
  providers: [UserContext],
  exports: [UserContext],
})
export class UserContextModule {}
