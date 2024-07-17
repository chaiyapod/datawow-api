import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { mockUser } from './__mock__';
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
    it('should return user when fined successfully', async () => {
      mockUserRepository.getByUsername.mockResolvedValue(mockUser);

      const actual = await service.findUserByUsername('test');

      expect(actual).toEqual(mockUser);
    });

    it('should return null when user not found successfully', async () => {
      mockUserRepository.getByUsername.mockResolvedValue(null);

      const actual = await service.findUserByUsername('test');

      expect(actual).toEqual(null);
    });
  });
});
