import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClsModule } from 'nestjs-cls';
import { AuthModule } from './auth';
import { DatabaseModule } from './database';
import { PostModule } from './post';
import { UserModule } from './user';

@Module({
  imports: [
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
