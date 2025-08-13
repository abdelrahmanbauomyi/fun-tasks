import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EventsService } from './service/events.service';
import { CreateEventDto } from './dto/events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}
