import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostCreateBody, PostEditBody } from './dto';
import { PostEntity } from './entities';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async createPost(body: PostCreateBody): Promise<{ id: string }> {
    const post = await this.postRepository.create(body);

    return { id: post.id };
  }

  public async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.getPostById(postId);

    this.validateOwner(userId, post);

    await this.postRepository.deleteById(post.id);
  }

  public async editPost(
    postId: string,
    userId: string,
    body: PostEditBody,
  ): Promise<PostEntity> {
    const post = await this.getPostById(postId);

    this.validateOwner(userId, post);

    return await this.postRepository.updateById(post.id, body);
  }

  private async getPostById(postId: string): Promise<PostEntity> {
    const post = await this.postRepository.getById(postId);
    if (!post) throw new NotFoundException(`post id ${postId} not found`);

    return post;
  }

  private validateOwner(userId: string, post: PostEntity): void {
    const canAction = post.createdById === userId;

    if (!canAction) {
      throw new BadRequestException(
        'unable to delete content that does not belong to you',
      );
    }
  }
}
