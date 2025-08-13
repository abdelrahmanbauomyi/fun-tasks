import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Events } from 'src/events/entity/events.entity';
import { Users } from 'src/user/entity/users.entity';
import { CreateEventDto } from '../dto/events.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    @InjectRepository(Events) private eventsRepo: Repository<Events>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
  ) {}

  /**
   * Creates a new event for a given user.
   *
   * @param dto - Data transfer object containing event details.
   * @returns The created event entity.
   * @throws NotFoundException if the provided user ID does not exist.
   * @throws BadRequestException if the event_name or execute_at is missing
   * @throws BadRequestException if execute_at date is invalid or has passed
   */

  async create(dto: CreateEventDto): Promise<Events> {
    const now = new Date();

    //check missing feilds
    if (!dto.event_name || !dto.execute_at) {
      this.logger.error(`Missing required fields: ${JSON.stringify(dto)}`);
      throw new BadRequestException('event_name and execute_at are required');
    }

    //check executeAt date if it's invalid or has passed
    const executeAt = new Date(dto.execute_at);
    if (executeAt <= now || isNaN(executeAt.getTime())) {
      this.logger.error(
        `execute_at date is in the past or invalid : ${dto.execute_at}`,
      );
      throw new BadRequestException('execute_at must be a valid date');
    }

    //check if user exsists
    const user = await this.usersRepo.findOne({
      where: { user_id: dto.user_id },
    });
    if (!user) {
      this.logger.error(`no matching record for user : ${dto.user_id}`);
      throw new NotFoundException('User not found');
    }

    //create event
    const event = this.eventsRepo.create({
      event_name: dto.event_name,
      execute_at: dto.execute_at,
      user: user,
    });
    this.logger.log('Created Event : ', event);
    return this.eventsRepo.save(event);
  }
  /**
   * Returns all events associated with a given user.
   *
   * @param user_id - The unique identifier of the user.
   * @returns A list of event entities belonging to the user.
   */
  async findByUser(user_id: string): Promise<Events[]> {
    const user = await this.usersRepo.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      this.logger.error(`no matching record for user : ${user_id}`);
      throw new NotFoundException('User not found');
    }
    return this.eventsRepo.find({
      where: { user: { user_id } },
      relations: ['user'],
    });
  }
  /**
   * Cron job that runs every minute to execute pending events.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleEventExecution() {
    const now = new Date();
    this.logger.log(`Event Execution Cron Job running at ${now}`);
    const pendingEvents = await this.eventsRepo.find({
      where: {
        status: 'pending',
        execute_at: LessThanOrEqual(now),
      },
    });
    if (pendingEvents.length) {
      this.logger.log(
        `Found ${pendingEvents.length} events to execute:`,
        pendingEvents,
      );
    }

    for (const event of pendingEvents) {
      event.status = 'executed';
      event.executed_at = now;
      await this.eventsRepo.save(event);
      this.logger.log(
        `Executed event: ${event.event_name} , (${event.event_id})`,
      );
    }
  }
}
