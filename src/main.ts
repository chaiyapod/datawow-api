import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClsInterceptor } from 'nestjs-cls';
import { TypeOrmFilter } from './shared/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClsInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new TypeOrmFilter());

  await app.listen(process.env.PORT || 4200);
}
bootstrap();
