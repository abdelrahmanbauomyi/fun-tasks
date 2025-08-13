import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/user.dto';
import { EventsService } from 'src/events/service/events.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly eventsService: EventsService,
  ) {}
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id/events')
  findByUser(@Param('user_id', new ParseUUIDPipe({ version: '4' })) user_id: string) {
    return this.eventsService.findByUser(user_id);
  }
}
