import { PostCategory } from '@/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { createMockPostEntity } from './__mock__';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  const mockPostRepository = mock<PostRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PostRepository, useValue: mockPostRepository },
      ],
    }).compile();
    service = module.get<PostService>(PostService);
  });

  describe('createPost', () => {
    it('should return post id  when create post successfully', async () => {
      const mockPostWithEmptyComment = createMockPostEntity({
        id: '1',
        title: 'test',
        content: 'create post test',
        category: PostCategory.Exercise,
      });

      mockPostRepository.create.mockResolvedValue(mockPostWithEmptyComment);

      const body = {
        title: 'test',
        content: 'create post test',
        category: PostCategory.Exercise,
      };

      const actual = await service.createPost(body);

      expect(actual).toEqual({ id: '1' });
    });
  });
});
