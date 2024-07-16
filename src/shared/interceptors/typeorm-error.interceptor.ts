import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message: string = (exception as TypeORMError).message;
    const code: number = (exception as any).code;

    const responseData = {
      message: message,
      data: { code, message },
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
  }
}
