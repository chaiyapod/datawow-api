import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginBody, AuthLoginResponse } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: AuthLoginBody): Promise<AuthLoginResponse> {
    const { user, token } = await this.authService.login(body);

    return AuthLoginResponse.create({
      data: { username: user.username, accessToken: token },
    });
  }
}
