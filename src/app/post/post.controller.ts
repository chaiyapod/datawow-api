import { Private } from '@/shared/decorators';
import { AuthGuard } from '@/shared/guards/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostCreateBody, PostCreateResponse } from './dto';
import { PostService } from './post.service';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Private()
  @Post()
  async createPost(@Body() body: PostCreateBody): Promise<PostCreateResponse> {
    const data = await this.postService.createPost(body);

    return PostCreateResponse.create({ data });
  }
}
