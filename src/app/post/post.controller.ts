import { Body, Controller, Post } from '@nestjs/common';
import { PostCreateBody, PostCreateResponse } from './dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() body: PostCreateBody): Promise<PostCreateResponse> {
    const data = await this.postService.createPost(body);

    return PostCreateResponse.create({ data });
  }
}
