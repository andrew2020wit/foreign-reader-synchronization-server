import { Injectable } from '@nestjs/common';

export interface ISynchronizePositionRequest {
  userKey: string;
  position: number;
}

export interface ISynchronizePositionResponse {
  userKey: string;
  position: number;
  changed: boolean;
}

@Injectable()
export class PositionService {
  synchronizePosition(
    req: ISynchronizePositionRequest,
  ): ISynchronizePositionResponse {
    return {
      ...req,
      changed: false,
    };
  }
}
