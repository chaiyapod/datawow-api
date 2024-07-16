import dayjs from 'dayjs';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AuditEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    transformer: {
      from: (value) => {
        return dayjs(value).unix();
      },
      to: (value) => value,
    },
  })
  createdAt!: number;

  @Column({ name: 'created_by_id', type: 'varchar', nullable: false })
  createdById!: string;

  @Column({ name: 'created_by_name', type: 'varchar', nullable: false })
  createdByName!: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    transformer: {
      from: (value) => dayjs(value).unix(),
      to: (value) => value,
    },
  })
  updatedAt!: number;

  @Column({ name: 'updated_by_id', type: 'varchar', nullable: true })
  updatedById?: string;

  @Column({ name: 'updated_by_name', type: 'varchar', nullable: true })
  updatedByName?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    select: false,
    transformer: {
      from: (value) => dayjs(value).unix(),
      to: (value) => value,
    },
  })
  deletedAt?: number;

  @Column({ name: 'deleted_by_id', type: 'varchar', nullable: true })
  deletedById?: string;
}
