import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Users } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<Users>;

  const mockUsersRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<Users>>(getRepositoryToken(Users));

    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      const dto: CreateUserDto = { name : 'testuser' };
      const createdUser = { id: 1, ...dto };
      
      mockUsersRepo.create.mockReturnValue(createdUser);
      mockUsersRepo.save.mockResolvedValue(createdUser);

      const result = await service.create(dto);

      expect(mockUsersRepo.create).toHaveBeenCalledWith(dto);
      expect(mockUsersRepo.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return all users with events relations', async () => {
      const usersArray = [{ id: 1, name: 'John', events: [] }];

      mockUsersRepo.find.mockResolvedValue(usersArray);

      const result = await service.findAll();

      expect(mockUsersRepo.find).toHaveBeenCalledWith({ relations: ['events'] });
      expect(result).toEqual(usersArray);
    });
  });
});
