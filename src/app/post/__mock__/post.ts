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
  audit = 'dummy',
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
    createdByName: audit,
    updatedAt: mockDate,
    updatedById: '1',
    updatedByName: audit,
  };
}

export const mockPost1 = createMockPostEntity({
  id: '1',
  comments: [mockComment1post1, mockComment2post1, mockComment3post1],
});
