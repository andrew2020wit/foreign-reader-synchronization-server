import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PositionService } from './service/position.service';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StoreService } from './store/store.service';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: './src/database/foreign-reader.db',
      autoLoadEntities: true,
      driver: SqliteDriver,
      // debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [PositionService, StoreService],
})
export class AppModule {}
