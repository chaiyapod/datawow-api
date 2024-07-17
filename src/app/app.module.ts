import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserContextModule } from '@/shared/user-context/user-context.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './auth';
import { seederCommands } from './commands';
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
    CommandModule,
  ],
  providers: [...seederCommands],
})
export class AppModule {}
