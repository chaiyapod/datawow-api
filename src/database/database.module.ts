import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postEntities } from 'src/post';
import { userEntities } from 'src/user';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT || '5432'),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        // TODO: if have time implement migration service
        synchronize: process.env.TYPEORM_SYNCHRONIZE
          ? JSON.parse(process.env.TYPEORM_SYNCHRONIZE)
          : false,
        logging: process.env.TYPEORM_LOGGING
          ? JSON.parse(process.env.TYPEORM_LOGGING)
          : false,
        autoLoadEntities: true,
        entities: [`${__dirname}/../**/**.entity{.ts}`],
      }),
      dataSourceFactory: async (options) => {
        if (!options) throw new Error('invalid options typeorm');
        return await new DataSource(options);
      },
    }),
    TypeOrmModule.forFeature([...postEntities, ...userEntities]),
  ],
})
export class DatabaseModule {}
