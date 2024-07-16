import { ApiResponse, AuthGuard, Private, User } from '@/shared';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  PostCreateBody,
  PostCreateResponse,
  PostEditBody,
  PostEditResponse,
} from './dto';
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
  @Put('/:id')
  async editPost(
    @Param('id', ParseUUIDPipe) postId: string,
    @User('sub') userId: string,
    @Body() body: PostEditBody,
  ): Promise<PostEditResponse> {
    const data = await this.postService.editPost(postId, userId, body);

    return PostEditResponse.create({ data });
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
