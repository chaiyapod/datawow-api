import { PostCategory } from '@/constants';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsString, Length } from 'class-validator';
import { ApiResponse } from 'src/shared';

export class PostCreateBody {
  @IsString()
  @Length(1)
  title!: string;

  @IsString()
  @Length(1)
  content!: string;

  @IsEnum(PostCategory)
  category!: PostCategory;
}

class PostCreateResponseData {
  @Expose()
  id!: string;
}

export class PostCreateResponse extends ApiResponse {
  @Type(() => PostCreateResponseData)
  @Expose()
  data!: PostCreateResponseData;
}
