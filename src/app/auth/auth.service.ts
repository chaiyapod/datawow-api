import { UserEntity, UserService } from '@/user';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginBody } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async login(
    body: AuthLoginBody,
  ): Promise<{ user: UserEntity; token: string }> {
    const { username } = body;

    const user = await this.userService.findUserByUsername(username);

    if (!user) throw new UnauthorizedException('invalid username');

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
