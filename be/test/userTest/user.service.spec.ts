import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../../src/modules/user/service/UserService";
import { UserRepository } from "../../src/modules/user/repository/UserRepository";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PostUserDto, UpdateUserDto } from "../../src/modules/user/dto/UserDto";
import { User } from "../../src/modules/user/entity/User";
import { Role } from "../../src/auth/authorization/Role";

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'password',
  salt: 'salt',
  role: Role.Admin,
  hashPassword: jest.fn(),
  posts: [],
  comments: [],
};

describe('UserService', () => {
  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      userRepository.findOne.mockResolvedValue(null);

      const postUserDto: PostUserDto = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const result = await userService.create(postUserDto);

      expect(userRepository.create).toHaveBeenCalledWith(postUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should throw an error if email already exists', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      const postUserDto: PostUserDto = { name: 'Test User', email: 'test@example.com', password: 'password' };

      await expect(userService.create(postUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.findOne(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found by email', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await userService.findByEmail('test@example.com');

      expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userRepository.find.mockResolvedValue([mockUser]);

      const result = await userService.findAll();

      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
        },
      ]);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
      const updatedUser = { ...mockUser, ...updateUserDto };

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await userService.update(1, updateUserDto);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        id: 1,
        name: 'Updated User',
        email: 'updated@example.com',
      });
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      const updateUserDto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };

      await expect(userService.update(1, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user successfully', async () => {
      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.delete.mockResolvedValue(null);

      await userService.remove(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
