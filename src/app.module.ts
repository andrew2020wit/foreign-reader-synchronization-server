import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PositionService } from './position/position.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PositionService],
})
export class AppModule {}
