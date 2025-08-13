import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './service/events.service';
import { CreateEventDto } from './dto/events.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule a new event' })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
    content: {
      'application/json': {
        example: {
          event_id: 'a9737240-ed61-4f52-84bc-165e4868b9f6',
          event_name: 'Team Meeting',
          execute_at: '2025-08-13T02:45:00Z',
          status: 'pending',
          executed_at: null,
          user: {
            user_id: 'a8fdb239-d8fb-4d42-abd8-4bd1c63c144d',
            name: 'Ahmed',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}
