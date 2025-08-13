import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './service/events.service';
import { EventsController } from './events.controller';
import { Events } from './entity/events.entity';
import { Users } from 'src/user/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Users])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
