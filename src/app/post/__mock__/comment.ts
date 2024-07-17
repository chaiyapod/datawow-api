import { PostCommentEntity } from '../entities';

export function createMockPostCommentEntity(
  postId: string,
  comment = 'comment',
): PostCommentEntity {
  const mockDate = Date.now();
  return {
    id: '1',
    comment,
    postId,
    createdAt: mockDate,
    createdById: '1',
    updatedAt: mockDate,
    updatedById: '1',
  };
}

export const mockComment1post1 = createMockPostCommentEntity('1', 'comment 1');
export const mockComment2post1 = createMockPostCommentEntity('1', 'comment 2');
export const mockComment3post1 = createMockPostCommentEntity('1', 'comment 3');
