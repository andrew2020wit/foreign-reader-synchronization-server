import { Body, Controller, Post } from '@nestjs/common';
import { PositionService } from './service/position.service';
import { ApiRouteEnum } from './enum/api-route.enum';
import { PositionRequestInterface } from './interface/position-request.interface';
import { PositionResponseInterface } from './interface/position-response.interface';

@Controller()
export class AppController {
  constructor(private readonly positionService: PositionService) {}

  @Post(ApiRouteEnum.position)
  async synchronizePosition(
    @Body() req: PositionRequestInterface,
  ): Promise<PositionResponseInterface> {
    const { userKey, bookId, position } = req;

    if (
      !userKey ||
      !bookId ||
      (!position && position !== 0) ||
      typeof userKey !== 'string' ||
      typeof bookId !== 'string' ||
      typeof position !== 'number'
    ) {
      throw {
        statusCode: 400,
        message: 'Bad Request',
      };
    }

    return this.positionService.synchronizePosition({
      userKey,
      bookId,
      position,
    });
  }
}
