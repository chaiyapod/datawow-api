import { PostCommentEntity } from './post-comment.entity';
import { PostEntity } from './post.entity';

export * from './post-comment.entity';
export * from './post.entity';

export const postEntities = [PostEntity, PostCommentEntity];
