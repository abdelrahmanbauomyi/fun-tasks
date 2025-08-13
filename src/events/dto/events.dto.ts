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
  @IsNotEmpty()
  event_name: string;

  @IsDateString()
  execute_at: Date;

  @IsUUID()
  user_id: string;
}
