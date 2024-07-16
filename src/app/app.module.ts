import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserContextModule } from '@/shared/user-context/user-context.module';
import { AuthModule } from './auth';
import { DatabaseModule } from './database';
import { PostModule } from './post';
import { UserModule } from './user';

@Module({
  imports: [
    UserContextModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
