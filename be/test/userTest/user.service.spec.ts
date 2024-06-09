import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../src/modules/user/service/UserService';
import { User } from '../../src/modules/user/entity/User';

const mockUser = {
  id: 1,
  name: 'tester',
  email: 'test@test.com',
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(repository, 'create').mockImplementation(() => mockUser as User);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser as User);

    const result = await service.create({ name: 'tester', email: 'test@test.com', });

    expect(result).toEqual(mockUser);
  });

  it('should find a user by ID', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as User);

    const result = await service.findOne(1);

    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow('User with ID 99 not found');
  });

  it('should return all users', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([mockUser] as User[]);

    const result = await service.findAll();

    expect(result).toEqual([mockUser]);
  });

  it('should update a user', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser as User);
    jest.spyOn(repository, 'save').mockResolvedValue({ ...mockUser, name: 'updatedUser' } as User);

    const result = await service.update(1, { name: 'updatedUser' });

    expect(result.name).toEqual('updatedUser');
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser as User);
    jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(mockUser.id);
  });
});
