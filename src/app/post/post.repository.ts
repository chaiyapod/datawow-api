import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
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

  public async getById(id: string): Promise<PostEntity | null> {
    return this.postRepo.findOneBy({ id });
  }

  public async deleteById(id: string): Promise<UpdateResult> {
    return this.postRepo.softDelete({ id });
  }

  public async updateById(
    id: string,
    payload: DeepPartial<Omit<PostEntity, 'id'>>,
  ): Promise<PostEntity> {
    const postEntity = this.postRepo.create({ id, ...payload });

    return this.postRepo.save(postEntity);
  }
}
