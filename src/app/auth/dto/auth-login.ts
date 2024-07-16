import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiResponse } from 'src/shared';

export class AuthLoginBody {
  @IsString()
  username!: string;
}

class AuthLoginResponseData {
  @Expose()
  username!: string;

  @Expose()
  accessToken!: string;
}

export class AuthLoginResponse extends ApiResponse {
  @Type(() => AuthLoginResponseData)
  @Expose()
  data!: AuthLoginResponseData;
}
