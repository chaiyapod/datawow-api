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
    event.entity.createdByName = this.contextStore.username;
  }

  beforeUpdate(event: UpdateEvent<AuditEntity>): void {
    if (!event.entity) return;

    event.entity['updatedById'] = this.contextStore.userId;
    event.entity['updatedByName'] = this.contextStore.username;
  }

  beforeSoftRemove(event: RemoveEvent<AuditEntity>): void {
    if (!event.entity) return;

    event.entity['updatedById'] = this.contextStore.userId;
  }
}
