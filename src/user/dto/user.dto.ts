import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO for creating a new user.
 *
 *
 * Validates that:
 * user name is a non-empty string
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ahmed' })
  name: string;
}
