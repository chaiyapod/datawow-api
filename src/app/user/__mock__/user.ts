import { UserEntity } from '../entities';

export function createMockUserEntity(username = 'dummy'): UserEntity {
  const mockDate = Date.now();
  return {
    id: '2',
    username,
    createdAt: mockDate,
    createdById: '1',
    createdByName: 'admin',
    updatedAt: mockDate,
    updatedById: '1',
    updatedByName: 'admin',
  };
}
