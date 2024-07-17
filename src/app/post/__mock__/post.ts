import { PostCategory } from '@/constants';
import { PostCommentEntity, PostEntity } from '../entities';
import {
  mockComment1post1,
  mockComment2post1,
  mockComment3post1,
} from './comment';

export function createMockPostEntity({
  id,
  title = 'title',
  content = 'content',
  comments = [],
  category = PostCategory.Exercise,
}: {
  id: string;
  title?: string;
  content?: string;
  audit?: string;
  comments?: PostCommentEntity[];
  category?: PostCategory;
}): PostEntity {
  const mockDate = Date.now();
  return {
    id,
    title,
    content,
    category,
    comments,
    createdAt: mockDate,
    createdById: '1',
    updatedAt: mockDate,
    updatedById: '1',
  };
}

export const mockPost1 = createMockPostEntity({
  id: '1',
  comments: [mockComment1post1, mockComment2post1, mockComment3post1],
});
