import { mockUser, UserService } from '@/user';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = mock<UserService>();
  const mockJwtService = mock<JwtService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return username and token when logged in successfully', async () => {
      mockUserService.findUserByUsername.mockResolvedValue(mockUser);
      const jwtSign = mockJwtService.sign.mockReturnValue('jwt');

      const body = { username: 'test' };

      const actual = await service.login(body);

      expect(actual).toEqual({ user: mockUser, token: 'jwt' });
      expect(jwtSign).toHaveBeenCalledWith({ sub: '2', username: 'test' });
    });

    it('should throw unauthorized error when user not found', async () => {
      mockUserService.findUserByUsername.mockResolvedValue(null);

      const body = { username: 'test' };

      await expect(service.login(body)).rejects.toThrow(UnauthorizedException);
    });
  });
});
