import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class IApiResponse {
  data!: unknown;
  metaData?: unknown;
}

export class ApiResponse {
  @ApiProperty({ default: 200, example: 200 })
  private statusCode: number;

  @ApiProperty({ default: 'success', example: 'success' })
  private message: string;

  constructor(httpCode = 200, message = 'success') {
    this.statusCode = httpCode;
    this.message = message;
  }

  public static success(): ApiResponse {
    const res = plainToInstance(this, {});
    res.statusCode = 200;
    res.message = 'success';
    return res;
  }

  public static created(): ApiResponse {
    const res = plainToInstance(this, {});
    res.statusCode = 201;
    res.message = 'success';
    return res;
  }

  public static noContent(): ApiResponse {
    const res = plainToInstance(this, {});
    res.statusCode = 204;
    res.message = 'success';
    return res;
  }

  public static create<T extends ApiResponse>(
    this: ClassConstructor<T>,
    dataLike?: Omit<T, 'statusCode' | 'message' | 'timestamp'> & {
      data?: unknown;
    },
  ): T {
    const res = plainToInstance(this, dataLike || {}, {
      strategy: 'exposeAll',
      excludeExtraneousValues: true,
    });
    if (dataLike && dataLike.data === undefined) {
      res.statusCode = 404;
      res.message = 'not found';
    }
    return res;
  }
}
