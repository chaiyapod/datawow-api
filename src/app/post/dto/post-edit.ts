import { PostCategory } from '@/constants';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsString, Length } from 'class-validator';
import { ApiResponse } from 'src/shared';

export class PostEditBody {
  @IsString()
  @Length(1)
  title!: string;

  @IsString()
  @Length(1)
  content!: string;

  @IsEnum(PostCategory)
  category!: PostCategory;
}

class PostEditResponseData {
  @Expose()
  id!: string;
}

export class PostEditResponse extends ApiResponse {
  @Type(() => PostEditResponseData)
  @Expose()
  data!: PostEditResponseData;
}
