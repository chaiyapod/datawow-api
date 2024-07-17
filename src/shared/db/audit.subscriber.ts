import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditEntity } from '../entities';
import { UserContext } from '../user-context';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<AuditEntity> {
  constructor(
    dataSource: DataSource,
    private readonly contextStore: UserContext,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof AuditEntity {
    return AuditEntity;
  }

  beforeInsert(event: InsertEvent<AuditEntity>): void {
    event.entity.createdById = this.contextStore.userId;
  }

  beforeUpdate(event: UpdateEvent<AuditEntity>): void {
    if (!event.entity) return;

    event.entity['updatedById'] = this.contextStore.userId;
  }

  beforeSoftRemove(event: RemoveEvent<AuditEntity>): void {
    if (!event.entity) return;

    event.entity['updatedById'] = this.contextStore.userId;
  }
}
