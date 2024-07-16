import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PostCategory } from 'src/constants';
import { AuditEntity } from 'src/shared';
import { PostCommentEntity } from './post-comment.entity';

@Entity()
export class PostEntity extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'title', type: 'varchar' })
  title!: string;

  @Column({ name: 'content', type: 'varchar' })
  content!: string;

  @Column({ name: 'category', type: 'enum', enum: PostCategory })
  category!: PostCategory;

  @OneToMany(() => PostCommentEntity, (postComment) => postComment._post, {
    cascade: true,
  })
  comments!: PostCommentEntity[];
}
