import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "../../src/modules/post/service/PostService";
import { PostRepository } from "../../src/modules/post/repository/PostRepository";
import { UserService } from "../../src/modules/user/service/UserService";
import { MovieService } from "../../src/modules/movie/service/MovieService";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PostPostDto, UpdatePostDto } from "../../src/modules/post/dto/PostDto";
import { User } from "../../src/modules/user/entity/User";
import { Post } from "../../src/modules/post/entity/Post";
import { Movie } from "../../src/modules/movie/entity/Movie";
import { PaginationDto } from "../../src/utils/pagination/paginationDto";
import { PaginationResult, paginate } from "../../src/utils/pagination/pagination";
import { Role } from "../../src/auth/authorization/Role";
import { BaseEntity } from "typeorm";

const mockPostRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  findPaginatedPostsByType: jest.fn(),
});

const mockUserService = () => ({
  findById: jest.fn(),
});

const mockMovieService = () => ({
  findById: jest.fn(),
});

class MockPost extends BaseEntity {
  id = 1;
  title = 'Test Post';
  content = 'This is a test post';
  type = 'test';
  score = 0;
  views = 0;
  thumbnailURL = '';
  photosURL = [];
  createdAt = new Date();
  updatedAt = new Date();
  user = { email: 'user@example.com', role: Role.User } as User;
  comments = [jest.fn()];
  movie = jest.fn() as unknown as Movie;
}

jest.mock('../../src/utils/pagination/pagination', () => ({
  paginate: jest.fn(),
}));

describe('PostService', () => {
  let postService;
  let postRepository;
  let userService;
  let movieService;
  let mockPost;

  beforeEach(async () => {
    mockPost = new MockPost();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PostRepository, useFactory: mockPostRepository },
        { provide: UserService, useFactory: mockUserService },
        { provide: MovieService, useFactory: mockMovieService },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get<PostRepository>(PostRepository);
    userService = module.get<UserService>(UserService);
    movieService = module.get<MovieService>(MovieService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a post successfully', async () => {
      userService.findById.mockResolvedValue({} as User);
      movieService.findById.mockResolvedValue({} as Movie);
      postRepository.create.mockReturnValue(mockPost);
      postRepository.save.mockResolvedValue(mockPost);

      const postPostDto: PostPostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        movieId: 1,
        thumbnailURL: '',
        type: 'test',
      };
      const result = await postService.create(postPostDto, 1);

      expect(postRepository.create).toHaveBeenCalledWith({
        ...postPostDto,
        user: {},
        movie: {},
      });
      expect(postRepository.save).toHaveBeenCalledWith(mockPost);

      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Test Post');
      expect(result.content).toEqual('This is a test post');
    });
  });

  describe('findOne', () => {
    it('should find a post successfully', async () => {
      postRepository.findById.mockResolvedValue(mockPost);
      postRepository.save.mockResolvedValue(mockPost);

      const result = await postService.findOne(1);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Test Post');
      expect(result.content).toEqual('This is a test post');
    });

    it('should throw an error if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      await expect(postService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return paginated posts', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };
      const paginatedResult: PaginationResult<Post> = { data: [mockPost], total: 1, page: 1, limit: 10 };

      (paginate as jest.Mock).mockResolvedValue(paginatedResult);

      const result = await postService.findAll(paginationDto);

      expect(result.data[0].id).toEqual(1);
      expect(result.data[0].title).toEqual('Test Post');
    });

    it('should handle errors when fetching posts', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };

      (paginate as jest.Mock).mockRejectedValue(new Error('Error fetching posts'));

      await expect(postService.findAll(paginationDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllWhereType', () => {
    it('should return paginated posts of a specific type', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };
      const paginatedResult: PaginationResult<Post> = { data: [mockPost], total: 1, page: 1, limit: 10 };

      postRepository.findPaginatedPostsByType.mockResolvedValue(paginatedResult);

      const result = await postService.findAllWhereType(paginationDto, 'test');

      expect(result.data[0].id).toEqual(1);
      expect(result.data[0].title).toEqual('Test Post');
    });
  });

  describe('update', () => {
    it('should update a post successfully', async () => {
      postRepository.findById.mockResolvedValue(mockPost);
      postRepository.save.mockResolvedValue(mockPost);

      const updatePostDto: UpdatePostDto = { title: 'Updated Post' };
      const jwtUser: User = { email: 'test@example.com', role: Role.Admin } as User;

      const result = await postService.update(1, updatePostDto, jwtUser);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Updated Post');
    });

    it('should throw an error if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      const updatePostDto: UpdatePostDto = { title: 'Updated Post' };
      const jwtUser: User = { email: 'test@example.com', role: Role.Admin } as User;

      await expect(postService.update(1, updatePostDto, jwtUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a post successfully', async () => {
      postRepository.findById.mockResolvedValue(mockPost);
      postRepository.delete.mockResolvedValue({ affected: 1 });

      await postService.remove(1);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(postRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      await expect(postService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
