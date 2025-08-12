import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService  } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './model/users.model';
import { Events } from './model/events.model';
@Module({
   imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [Users, Events],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
