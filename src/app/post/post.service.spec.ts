import { PostCategory } from '@/constants';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { createMockPostEntity, mockPost1 } from './__mock__';
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
    it('should return post id when create post successfully', async () => {
      const mockPostWithEmptyComment = createMockPostEntity({
        id: '1',
        title: 'test',
        content: 'create post test',
        category: PostCategory.Exercise,
      });

      const createFn = mockPostRepository.create.mockResolvedValue(
        mockPostWithEmptyComment,
      );

      const body = {
        title: 'test',
        content: 'create post test',
        category: PostCategory.Exercise,
      };

      const actual = await service.createPost(body);

      expect(actual).toEqual({ id: '1' });
      expect(createFn).toHaveBeenCalledWith({
        title: 'test',
        content: 'create post test',
        category: PostCategory.Exercise,
      });
    });
  });

  describe('deletePost', () => {
    it('should return void when delete own post successfully', async () => {
      mockPostRepository.getById.mockResolvedValue(mockPost1);
      const deleteFn = mockPostRepository.deleteById.mockResolvedValue({
        generatedMaps: [],
        raw: '',
      });

      const actual = await service.deletePost('1', '1');

      expect(actual).toBeFalsy();
      expect(deleteFn).toHaveBeenCalledWith('1');
    });

    it('should throw not found error when post not found', async () => {
      mockPostRepository.getById.mockResolvedValue(null);

      await expect(service.deletePost('1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw bad request error when user delete not own post', async () => {
      mockPostRepository.getById.mockResolvedValue(mockPost1);

      await expect(service.deletePost('1', '2')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('editPost', () => {
    const changedPostBody = {
      title: 'change',
      content: 'content',
      category: PostCategory.Exercise,
    };

    it('should return post entity when edit own post successfully', async () => {
      mockPostRepository.getById.mockResolvedValue(mockPost1);
      const updateFn =
        mockPostRepository.updateById.mockResolvedValue(mockPost1);

      const actual = await service.editPost('1', '1', changedPostBody);

      expect(actual).toEqual(mockPost1);
      expect(updateFn).toHaveBeenCalledWith('1', {
        title: 'change',
        content: 'content',
        category: PostCategory.Exercise,
      });
    });

    it('should throw not found error when post not found', async () => {
      mockPostRepository.getById.mockResolvedValue(null);

      await expect(service.editPost('1', '1', changedPostBody)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw bad request error when user edit not own post', async () => {
      mockPostRepository.getById.mockResolvedValue(mockPost1);

      await expect(service.editPost('1', '2', changedPostBody)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
