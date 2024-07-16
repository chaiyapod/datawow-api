import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiResponse } from 'src/shared';

export class AuthLoginBody {
  @IsString()
  id: string;
}

class AuthLoginBodyResponseData extends ApiResponse {
  @Expose()
  accessToken!: string;
}

export class AuthLoginBodyResponse extends ApiResponse {
  @Type(() => AuthLoginBodyResponseData)
  @Expose()
  data!: AuthLoginBodyResponseData;
}
