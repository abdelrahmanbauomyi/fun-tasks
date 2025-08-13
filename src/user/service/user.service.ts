import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  /**
   * Create a new user.
   * @param dto - The DTO containing user creation data.
   */
  async create(dto: CreateUserDto): Promise<Users> {
    const user = this.usersRepo.create(dto);
    this.logger.log(`Creating user:` ,user);
    return this.usersRepo.save(user);
  }
  /**
   * Get all users.
   */
  async findAll(): Promise<Users[]> {
    return this.usersRepo.find({ relations: ['events'] });
  }
}
