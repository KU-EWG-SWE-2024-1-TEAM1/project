import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostService } from '../../src/modules/post/service/PostService';
import { Post } from '../../src/modules/post/entity/Post';
import { User } from '../../src/modules/user/entity/User';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../src/utils/pagination/paginationDto';
import { PostPostDto, UpdatePostDto } from '../../src/modules/post/dto/PostDto';
import { UserService } from '../../src/modules/user/service/UserService';
import { PostRepository } from "../../src/modules/post/repository/PostRepository";

const mockPostRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
  findAndCount: jest.fn(),
});

const mockUserService = () => ({
  findOne: jest.fn(),
});

type MockPostRepository = ReturnType<typeof mockPostRepository>;
type MockUserService = Partial<Record<keyof UserService, jest.Mock>>;

describe('PostService', () => {
  let service: PostService;
  let postRepository: MockPostRepository;
  let userService: MockUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: getRepositoryToken(PostRepository), useValue: mockPostRepository() },
        { provide: UserService, useValue: mockUserService() },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<MockPostRepository>(getRepositoryToken(PostRepository));
    userService = module.get<MockUserService>(UserService);
  });

  describe('create', () => {
    it('should successfully create a post', async () => {
      const postPostDto: PostPostDto = { title: 'Test Post', content: 'Test Content', userId: 1 };
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };
      const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', user, comment: null };

      userService.findOne.mockResolvedValue(user);
      postRepository.create.mockReturnValue(post);
      postRepository.save.mockResolvedValue(post);

      const result = await service.create(postPostDto);
      expect(result).toEqual({
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        user: { id: 1, name: 'Test User' },
      });
    });

    it('should throw an error if user is not found', async () => {
      const postPostDto: PostPostDto = { title: 'Test Post', content: 'Test Content', userId: 1 };

      userService.findOne.mockRejectedValue(new NotFoundException());

      await expect(service.create(postPostDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a post if post is found', async () => {
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };
      const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', user, comment: null };

      postRepository.findById.mockResolvedValue(post);

      const result = await service.findOne(1);
      expect(result).toEqual({
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        user: { id: 1, name: 'Test User' },
      });
    });

    it('should throw an error if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };
      const posts: Post[] = [
        { id: 1, title: 'Test Post 1', content: 'Test Content 1', user, comment: null },
        { id: 2, title: 'Test Post 2', content: 'Test Content 2', user, comment: null },
      ];

      postRepository.findAndCount.mockResolvedValue([posts, 2]);

      const result = await service.findAll(paginationDto);
      expect(result).toEqual({
        data: [
          { id: 1, title: 'Test Post 1', content: 'Test Content 1', user: { id: 1, name: 'Test User' } },
          { id: 2, title: 'Test Post 2', content: 'Test Content 2', user: { id: 1, name: 'Test User' } },
        ],
        total: 2,
        page: 1,
        limit: 10,
      });
      expect(postRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: { id: 'ASC' },
        relations: ['user'],
      });
    });


    it('should throw an error if fetching posts fails', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };

      postRepository.find.mockRejectedValue(new Error('Failed to fetch posts'));

      await expect(service.findAll(paginationDto)).rejects.toThrow('Failed to fetch posts');
    });
  });


  describe('update', () => {
    it('should update a post successfully', async () => {
      const updatePostDto: UpdatePostDto = { title: 'Updated Post', content: 'Updated Content' };
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };
      const existingPost: Post = { id: 1, title: 'Test Post', content: 'Test Content', user, comment: null };
      const updatedPost: Post = { ...existingPost, ...updatePostDto };

      postRepository.findById.mockResolvedValue(existingPost);
      postRepository.save.mockResolvedValue(updatedPost);

      const result = await service.update(1, updatePostDto);
      expect(result).toEqual({
        id: 1,
        title: 'Updated Post',
        content: 'Updated Content',
        user: { id: 1, name: 'Test User' },
      });
    });

    it('should throw an error if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      const updatePostDto: UpdatePostDto = { title: 'Updated Post', content: 'Updated Content' };

      await expect(service.update(1, updatePostDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a post successfully', async () => {
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', posts: [], comments: [] };
      const existingPost: Post = { id: 1, title: 'Test Post', content: 'Test Content', user, comment: null };

      postRepository.findById.mockResolvedValue(existingPost);
      postRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw an error if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});




