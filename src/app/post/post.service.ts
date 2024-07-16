import { Injectable } from '@nestjs/common';
import { PostCreateBody } from './dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async createPost(body: PostCreateBody): Promise<{ id: string }> {
    const post = await this.postRepository.create(body);

    return { id: post.id };
  }
}
