import { AuditEntity } from '@/shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends AuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username!: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image?: string | null;
}
