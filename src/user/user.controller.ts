import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/user.dto';
import { EventsService } from 'src/events/service/events.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly eventsService: EventsService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'user created successfully',
    content: {
      'application/json': {
        example: {
          user_id: 'b5ef4404-3fe0-47f3-8e37-15a28cbf44d9',
          name: 'Amir',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({
    status: 200,
    description: 'users returned successfully',
    content: {
      'application/json': {
        example: {
          user_id: 'a8fdb239-d8fb-4d42-abd8-4bd1c63c144d',
          name: 'Ahmed',
          events: [
            {
              event_id: '1171fa8f-2081-4103-88ca-112470c550d4',
              event_name: 'Team Meeting',
              execute_at: '2025-08-13T02:01:00.000Z',
              status: 'executed',
              executed_at: '2025-08-13T02:11:00.014Z',
            },
            {
              event_id: '261492f6-8fbc-468c-b4fe-c61200b15529',
              event_name: 'Team Meeting',
              execute_at: '2025-08-13T02:14:00.000Z',
              status: 'executed',
              executed_at: '2025-08-13T02:14:00.028Z',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id/events')
  @ApiOperation({ summary: 'get all events by a user ID' })
  @ApiResponse({
    status: 200,
    description: 'users returned successfully',
    content: {
      'application/json': {
        example: {
          events: [
            {
              event_id: '1171fa8f-2081-4103-88ca-112470c550d4',
              event_name: 'Team Meeting',
              execute_at: '2025-08-13T02:01:00.000Z',
              status: 'executed',
              executed_at: '2025-08-13T02:11:00.014Z',
            },
            {
              event_id: '261492f6-8fbc-468c-b4fe-c61200b15529',
              event_name: 'Team Meeting',
              execute_at: '2025-08-13T02:14:00.000Z',
              status: 'executed',
              executed_at: '2025-08-13T02:14:00.028Z',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({ status: 400, description: 'invalid execute_at date or empty event_name or execute_at' })
  findByUser(
    @Param('user_id', new ParseUUIDPipe({ version: '4' })) user_id: string,
  ) {
    return this.eventsService.findByUser(user_id);
  }
}
