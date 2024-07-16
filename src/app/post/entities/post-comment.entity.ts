import { AuditEntity } from '@/shared';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class PostCommentEntity extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'comment', type: 'varchar' })
  comment!: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId!: string;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  _post?: PostEntity;
}
