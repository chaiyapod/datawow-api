import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PostEntity } from './entities';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  public async create(payload: DeepPartial<PostEntity>): Promise<PostEntity> {
    const post = await this.postRepo.create(payload);
    return this.postRepo.save(post);
  }
}
