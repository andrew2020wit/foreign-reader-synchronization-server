import { Body, Controller, Post } from '@nestjs/common';
import {
  ISynchronizePositionRequest,
  ISynchronizePositionResponse,
  PositionService,
} from './position/position.service';

export enum apiRoutes {
  Position = 'position',
}

@Controller()
export class AppController {
  constructor(private readonly positionService: PositionService) {}

  @Post(apiRoutes.Position)
  synchronizePosition(
    @Body() req: ISynchronizePositionRequest,
  ): ISynchronizePositionResponse {
    return this.positionService.synchronizePosition(req);
  }
}
