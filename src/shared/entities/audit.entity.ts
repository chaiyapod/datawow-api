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
  })
  deletedAt?: number;

  @Column({ name: 'deleted_by_id', type: 'varchar', nullable: true })
  deletedById?: string;
}
