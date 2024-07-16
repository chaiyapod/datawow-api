import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostCreateBody } from './dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async createPost(body: PostCreateBody): Promise<{ id: string }> {
    const post = await this.postRepository.create(body);

    return { id: post.id };
  }

  public async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.postRepository.getById(postId);

    if (!post) throw new NotFoundException(`post id ${postId} not found`);

    const isOwnerPost = post.createdById === userId;
    if (!isOwnerPost) {
      throw new BadRequestException(
        'unable to delete content that does not belong to you',
      );
    }

    await this.postRepository.deleteById(post.id);

    return;
  }
}
