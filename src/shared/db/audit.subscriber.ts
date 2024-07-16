import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditEntity } from '../entities';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<AuditEntity> {
  constructor(
    dataSource: DataSource,
    private readonly cls: ClsService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof AuditEntity {
    return AuditEntity;
  }

  beforeInsert(event: InsertEvent<AuditEntity>): void {
    event.entity.createdById = this.cls.get('userId');
    event.entity.createdByName = this.cls.get('username');
  }

  beforeUpdate(event: UpdateEvent<AuditEntity>): void {
    if (!event.entity) return;

    event.entity['updatedById'] = this.cls.get('userId');
    event.entity['updatedByName'] = this.cls.get('username');
  }

  beforeSoftRemove(event: RemoveEvent<AuditEntity>): void {
    if (!event.entity) return;

    event.entity['updatedById'] = this.cls.get('userId');
  }
}
