import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { ICreatePositionEntity, Position } from '../entities/position';
import { computePositionId } from '../utils/compute-position-id';
import { User } from '../entities/user';
import { computeCurrentTime } from '../utils/compute-current-time';

@Injectable()
export class StoreService {
  constructor(private readonly entityManager: EntityManager) {}

  public async getUserKey(userKey: string): Promise<User> {
    return this.entityManager.findOne(User, { userKey });
  }

  public async getPosition(userKey: string, bookId: string): Promise<Position> {
    const positionId = computePositionId(userKey, bookId);

    return this.entityManager.findOne(Position, positionId);
  }

  public async createPosition(createDTO: ICreatePositionEntity): Promise<void> {
    const newPosition = new Position({
      position: createDTO.position,
      bookId: createDTO.bookId,
      userKey: createDTO.userKey,
    });

    await this.entityManager.persist(newPosition).flush();
  }

  public async updatePosition(
    positionId: string,
    positionValue: number,
  ): Promise<void> {
    const entity = await this.entityManager.findOne(Position, positionId);

    entity.position = positionValue;
    entity.updated = computeCurrentTime();

    await this.entityManager.persist(entity).flush();
  }
}
