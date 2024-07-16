import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { createMockUserEntity, UserService } from 'src/user';
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
    it('should return username and token successfully', async () => {
      const mockUser = createMockUserEntity('test');

      mockUserService.findUserByUsername.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('jwt');

      const body = { username: 'test' };

      const actual = await service.login(body);

      expect(actual).toEqual({ user: mockUser, token: 'jwt' });
    });

    it('should throw unauthorized when user not found', async () => {
      mockUserService.findUserByUsername.mockResolvedValue(null);

      const body = { username: 'test' };

      await expect(service.login(body)).rejects.toThrow(UnauthorizedException);
    });
  });
});
