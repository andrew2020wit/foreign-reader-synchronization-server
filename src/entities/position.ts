import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { computePositionId } from '../utils/compute-position-id';
import { computeCurrentTime } from '../utils/compute-current-time';

export interface ICreatePositionEntity {
  userKey: string;
  bookId: string;
  position: number;
}

@Entity()
export class Position {
  constructor(createDTO: ICreatePositionEntity) {
    this.id = computePositionId(createDTO.userKey, createDTO.bookId);
    this.position = createDTO.position;
    this.updated = computeCurrentTime();
  }

  @PrimaryKey()
  id: string;

  @Property()
  position: number;

  @Property()
  updated: string;
}
