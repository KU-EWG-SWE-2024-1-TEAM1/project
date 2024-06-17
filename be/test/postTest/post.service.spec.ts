import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../../src/modules/post/service/PostService';
import { Post } from '../../src/modules/post/entity/Post';
import { User } from '../../src/modules/user/entity/User';
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PaginationDto } from '../../src/utils/pagination/paginationDto';
import { PostPostDto, ResponsePostDto, UpdatePostDto } from "../../src/modules/post/dto/PostDto";
import { UserService } from '../../src/modules/user/service/UserService';
import { PostRepository } from "../../src/modules/post/repository/PostRepository";
import { Movie } from "../../src/modules/movie/entity/Movie";
import { MovieService } from "../../src/modules/movie/service/MovieService";
import { PaginationResult } from "../../src/utils/pagination/pagination";

const mockPostRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
});

const mockUserService = () => ({
  findById: jest.fn(),
});

const mockMovieService = () => ({
  findById: jest.fn(),
});

const mockPost: Partial<Post> = {
  id: 1,
  title: 'Test Post',
  content: 'Test Content',
  user: {} as User,
  movie: {} as Movie,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUser: Partial<User> = {
  id: 1,
};

const mockMovie: Partial<Movie> = {
  id: 1,
};

describe('PostService', () => {
  let service: PostService;
  let postRepository: ReturnType<typeof mockPostRepository>;
  let userService: ReturnType<typeof mockUserService>;
  let movieService: ReturnType<typeof mockMovieService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PostRepository, useFactory: mockPostRepository },
        { provide: UserService, useFactory: mockUserService },
        { provide: MovieService, useFactory: mockMovieService },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get(PostRepository);
    userService = module.get(UserService);
    movieService = module.get(MovieService);
  });

  describe('create', () => {
    it('should create a post successfully', async () => {
      const postPostDto: PostPostDto = {
        title: 'Test Post',
        content: 'Test Content',
        movieId: 1,
      };

      userService.findById.mockResolvedValue(mockUser as User);
      movieService.findById.mockResolvedValue(mockMovie as Movie);
      postRepository.create.mockReturnValue(mockPost);
      postRepository.save.mockResolvedValue(mockPost as Post);

      const result = await service.create(postPostDto, 1);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(movieService.findById).toHaveBeenCalledWith(1);
      expect(postRepository.create).toHaveBeenCalledWith({
        ...postPostDto,
        user: mockUser,
        movie: mockMovie,
      });
      expect(postRepository.save).toHaveBeenCalledWith(mockPost);
      expect(result).toEqual(expect.objectContaining({
        title: 'Test Post',
        content: 'Test Content',
      }));
    });

    it('should throw NotFoundException if movie not found', async () => {
      userService.findById.mockResolvedValue(mockUser as User);
      movieService.findById.mockImplementation(() => {
        throw new NotFoundException('Movie with ID 1 not found');
      });
      const postPostDto: PostPostDto = {
        title: 'Test Post',
        content: 'Test Content',
        movieId: 1,
      };

      await expect(service.create(postPostDto, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a post if found', async () => {
      postRepository.findById.mockResolvedValue(mockPost as Post);

      const result = await service.findOne(1);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expect.objectContaining({
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
      }));
    });

    it('should throw NotFoundException if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all posts with pagination', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'title', order: 'ASC' };
      const resultData: PaginationResult<Post> = {
        data: [mockPost as Post],
        total: 1,
        page: 1,
        limit: 10,
      };

      jest.spyOn(service as any, 'handleErrors').mockImplementation(() => Promise.resolve(resultData));

      const result = await service.findAll(paginationDto);

      expect(result).toEqual(expect.objectContaining({
        data: [expect.objectContaining({
          id: 1,
          title: 'Test Post',
          content: 'Test Content',
        })],
        total: 1,
        page: 1,
        limit: 10,
      }));
    });
  });

  describe('update', () => {
    it('should update a post successfully', async () => {
      const updatePostDto: UpdatePostDto = { title: 'Updated Post' };
      const updatedPost = { ...mockPost, ...updatePostDto };

      postRepository.findById.mockResolvedValue(mockPost as Post);
      postRepository.save.mockResolvedValue(updatedPost as Post);

      const result = await service.update(1, updatePostDto, mockUser as User);

      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(postRepository.save).toHaveBeenCalledWith(updatedPost);
      expect(result).toEqual(expect.objectContaining(updatePostDto));
    });

    it('should throw NotFoundException if post is not found', async () => {
      postRepository.findById.mockResolvedValue(null);

      const updatePostDto: UpdatePostDto = { title: 'Updated Post' };

      await expect(service.update(1, updatePostDto, mockUser as User)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if update fails', async () => {
      const updatePostDto: UpdatePostDto = { title: 'Updated Post' };

      postRepository.findById.mockResolvedValue(mockPost as Post);
      postRepository.save.mockRejectedValue(new Error('Failed to update post'));

      await expect(service.update(1, updatePostDto, mockUser as User)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a post successfully', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPost as ResponsePostDto);
      postRepository.delete.mockResolvedValue(null);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(postRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if post is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if delete fails', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPost as ResponsePostDto);
      postRepository.delete.mockRejectedValue(new Error('Failed to delete post'));

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });
});