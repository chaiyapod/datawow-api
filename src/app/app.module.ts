import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth';
import { DatabaseModule } from './database';
import { PostModule } from './post';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
