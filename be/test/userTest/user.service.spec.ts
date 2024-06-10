import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../src/modules/user/service/UserService';
import { User } from '../../src/modules/user/entity/User';
import { ResponseUserDto } from '../../src/modules/user/dto/UserDto';

const mockUser: User = {
  id: 1,
  name: 'tester',
  email: 'test@test.com',
  posts: [],
};

const mockResponseUserDto: ResponseUserDto = {
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
    jest.spyOn(repository, 'create').mockImplementation(() => mockUser);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser);
    jest.spyOn(repository, 'findOne').mockResolvedValue(null); // Ensure no duplicate email

    const result = await service.create({ name: 'tester', email: 'test@test.com' });

    expect(result).toEqual(mockResponseUserDto);
  });

  it('should throw an error if email already exists', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser); // Duplicate email

    await expect(service.create({ name: 'tester', email: 'test@test.com' }))
      .rejects
      .toThrow('Email test@test.com already exists');
  });

  it('should find a user by ID', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);

    const result = await service.findOne(1);

    expect(result).toEqual(mockResponseUserDto);
  });

  it('should throw an error if user not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow('User with ID 99 not found');
  });

  it('should return all users', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([mockUser]);

    const result = await service.findAll();

    expect(result).toEqual([mockResponseUserDto]);
  });

  it('should update a user', async () => {
    const updatedUser: User = { ...mockUser, name: 'updatedUser' };
    const updatedResponseUserDto: ResponseUserDto = { ...mockResponseUserDto, name: 'updatedUser' };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockResponseUserDto);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedUser);

    const result = await service.update(1, { name: 'updatedUser' });

    expect(result).toEqual(updatedResponseUserDto);
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockResponseUserDto);
    jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(mockUser.id);
  });
});
