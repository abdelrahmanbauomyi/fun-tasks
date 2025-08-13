import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Events } from 'src/events/entity/events.entity';
import { Users } from 'src/user/entity/users.entity';
import { Repository, LessThanOrEqual } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('EventsService', () => {
  let service: EventsService;
  let eventsRepo: jest.Mocked<Repository<Events>>;
  let usersRepo: jest.Mocked<Repository<Users>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Events),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventsRepo = module.get(getRepositoryToken(Events));
    usersRepo = module.get(getRepositoryToken(Users));
  });

  describe('create', () => {
    it('should throw if required fields are missing', async () => {
      await expect(
        service.create({ event_name: '', execute_at: '', user_id: 'u1' } as any)
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if execute_at is invalid', async () => {
      await expect(
        service.create({ event_name: 'test', execute_at: new Date(`invalid-date`), user_id: 'u1' })
      ).rejects.toThrow('execute_at must be a valid date');
    });

    it('should throw if execute_at is in the past', async () => {
      const past = new Date(Date.now() - 10000);
      await expect(
        service.create({ event_name: 'test', execute_at: past, user_id: 'u1' })
      ).rejects.toThrow('execute_at must be a valid date');
    });

    it('should throw if user not found', async () => {
      usersRepo.findOne.mockResolvedValue(null);
      const future = new Date(Date.now() + 60000);
      await expect(
        service.create({ event_name: 'test', execute_at: future, user_id: 'u1' })
      ).rejects.toThrow(NotFoundException);
    });

    it('should create and save an event successfully', async () => {
      const future = new Date(Date.now() + 60000);
      const user = { user_id: 'u1' } as Users;
      usersRepo.findOne.mockResolvedValue(user);

      const createdEvent = { event_name: 'test', execute_at: future, user };
      eventsRepo.create.mockReturnValue(createdEvent as any);
      eventsRepo.save.mockResolvedValue({ ...createdEvent, event_id: 1 } as any);

      const result = await service.create({
        event_name: 'test',
        execute_at: future,
        user_id: 'u1',
      });

      expect(eventsRepo.create).toHaveBeenCalledWith({
        event_name: 'test',
        execute_at: future,
        user,
      });
      expect(eventsRepo.save).toHaveBeenCalledWith(createdEvent);
      expect(result.event_id).toBe(1);
    });
  });

  

  describe('handleEventExecution', () => {
    it('should mark pending events as executed', async () => {
      const now = new Date();
      const pendingEvents = [
         {
        event_id: "8931697d-36b2-48c7-a28d-8955aa19089f",
        event_name: "Team Meeting",
        execute_at: new Date("2025-08-13T02:14:00.000Z"),
        status: "executed",
        executed_at: new Date("2025-08-13T02:17:00.013Z"),
        user: {
            user_id: "a8fdb239-d8fb-4d42-abd8-4bd1c63c144d",
            name: "Ahmed"
        }
    } as Events,
      ];
      eventsRepo.find.mockResolvedValue(pendingEvents);
      eventsRepo.save.mockResolvedValue({} as Events);

      await service.handleEventExecution();

      expect(eventsRepo.find).toHaveBeenCalledWith({
        where: { status: 'pending', execute_at: LessThanOrEqual(expect.any(Date)) },
      });
      expect(eventsRepo.save).toHaveBeenCalledTimes(1);
      expect(pendingEvents[0].status).toBe('executed');
      expect(pendingEvents[0].executed_at).toBeDefined();
    });
  });
});
