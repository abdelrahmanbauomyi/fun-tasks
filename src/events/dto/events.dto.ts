import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
/**
 * DTO for creating a new event.
 *
 *
 * Validates that:
 * - title is non-empty .
 * - user_id is in UUID format
 * - date is a valid date .
 */
export class CreateEventDto {
  @ApiProperty({ example: 'Team Meeting' })
  @IsNotEmpty()
  event_name: string;

  @ApiProperty({
    example: '2025-08-20T15:00:00Z',
    description: 'ISO 8601 Datetime String',
  })
  @IsDateString()
  execute_at: Date;

  @ApiProperty({
    example: 'a8fdb239-d8fb-4d42-abd8-4bd1c63c144d',
    description: 'UUID string',
  })
  @IsUUID()
  user_id: string;
}
