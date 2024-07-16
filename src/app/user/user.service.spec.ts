import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { createMockUserEntity } from './__mock__';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = mock<UserRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('findUserByUsername', () => {
    it('should return user successfully', async () => {
      const mockUser = createMockUserEntity('test');

      mockUserRepository.findByUsername.mockResolvedValue(mockUser);

      const actual = await service.findUserByUsername('test');

      expect(actual).toEqual(mockUser);
    });

    it('should return null when user not found successfully', async () => {
      mockUserRepository.findByUsername.mockResolvedValue(null);

      const actual = await service.findUserByUsername('test');

      expect(actual).toEqual(null);
    });
  });
});
