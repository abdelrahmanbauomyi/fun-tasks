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
  name: string;
}
