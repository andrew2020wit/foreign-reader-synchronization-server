import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { PositionRequestInterface } from '../interface/position-request.interface';
import { PositionResponseInterface } from '../interface/position-response.interface';

@Injectable()
export class PositionService {
  constructor(private store: StoreService) {}

  async synchronizePosition(
    newPosition: PositionRequestInterface,
  ): Promise<PositionResponseInterface> {
    const userKey = await this.store.getUserKey(newPosition.userKey);

    console.log(newPosition);

    if (!userKey) {
      throw new UnauthorizedException();
    }

    const currentPosition = await this.store.getPosition(
      newPosition.userKey,
      newPosition.bookId,
    );

    if (!currentPosition) {
      await this.store.createPosition(newPosition);

      return {
        position: newPosition.position,
      };
    } else {
      if (currentPosition.position >= newPosition.position) {
        return {
          position: currentPosition.position,
        };
      } else {
        await this.store.updatePosition(
          currentPosition.id,
          newPosition.position,
        );

        return {
          position: newPosition.position,
        };
      }
    }
  }
}
