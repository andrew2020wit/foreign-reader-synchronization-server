import { Injectable } from '@nestjs/common';
import { ISynchronizePositionRequest } from '../position/position.service';

@Injectable()
export class StoreService {
  public savePosition(req: ISynchronizePositionRequest) {
    return req;
  }

  public getPosition(userKey: string) {
    return userKey;
  }
}
