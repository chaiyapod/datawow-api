import { ApiResponse, AuthGuard, Private, User } from '@/shared';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Private()
  @Delete('/:id')
  async deletePost(
    @Param('id', ParseUUIDPipe) postId: string,
    @User('sub') userId: string,
  ): Promise<ApiResponse> {
    await this.postService.deletePost(postId, userId);

    return ApiResponse.success();
  }
}
