import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from "../../src/modules/user/service/UserService";
import { User } from "../../src/modules/user/entity/User";
import { UserRepository } from "../../src/modules/user/repository/UserRepository";
import { PostUserDto, UpdateUserDto } from "../../src/modules/user/dto/UserDto";
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
});

type MockUserRepository = Partial<Record<keyof UserRepository, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(UserRepository), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserRepository));
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const postUserDto: PostUserDto = { name: 'Test User', email: 'test@example.com' };
      const savedUser: User = { id: 1, ...postUserDto, posts: [], comments: [] };

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(savedUser);
      userRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(postUserDto);
      expect(result).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
    });

    it('should throw an error if email already exists', async () => {
      const postUserDto: PostUserDto = { name: 'Test User', email: 'test@example.com' };
      const existingUser: User = { id: 1, ...postUserDto, posts: [], comments: [] };

      userRepository.findOne.mockResolvedValue(existingUser);

      await expect(service.create(postUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a user if user is found', async () => {
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };

      userRepository.findById.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] },
        { id: 2, name: 'Test User 2', email: 'test2@example.com', posts: [], comments: [] },
      ];

      userRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual([
        { id: 1, name: 'Test User', email: 'test@example.com' },
        { id: 2, name: 'Test User 2', email: 'test2@example.com' },
      ]);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      const existingUser: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };
      const updatedUser: User = { ...existingUser, ...updateUserDto };

      userRepository.findById.mockResolvedValue(existingUser);
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual({ id: 1, name: 'Updated User', email: 'test@example.com' });
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      const updateUserDto: UpdateUserDto = { name: 'Updated User' };

      await expect(service.update(1, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      const existingUser: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };

      userRepository.findById.mockResolvedValue(existingUser);
      userRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});