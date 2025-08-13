import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { Users } from './user/entity/users.entity';
import { Events } from './events/entity/events.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Users, Events],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    EventsModule,
    UsersModule,
  ],
})
export class AppModule {}
