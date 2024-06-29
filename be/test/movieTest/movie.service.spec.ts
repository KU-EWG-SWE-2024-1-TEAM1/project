import { Test, TestingModule } from "@nestjs/testing";
import { MovieService } from "../../src/modules/movie/service/MovieService";
import { MovieRepository } from "../../src/modules/movie/repository/MovieRepository";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { PostMovieDto, UpdateMovieDto } from "../../src/modules/movie/dto/MovieDto";
import { Movie } from "../../src/modules/movie/entity/Movie";
import { PaginationDto } from "../../src/utils/pagination/paginationDto";
import { PaginationResult } from "../../src/utils/pagination/pagination";
import { mapToDto } from "../../src/utils/mapper/Mapper";
import { BaseEntity } from "typeorm";
import {Post} from "../../src/modules/post/entity/Post";

const mockMovieRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  findPaginatedMovies: jest.fn(),
});

class MockMovie extends BaseEntity {
  id = 1;
  title = 'Test Movie';
  description = 'This is a test movie';
  youtubeUrl = 'http://youtube.com/test';
  bigImgUrl = 'http://bigimg.com/test';
  thumbNailUrl = 'http://thumbnail.com/test';
  createdAt = new Date();
  updatedAt = new Date();
  posts = [jest.fn() as unknown as Post];
}

describe('MovieService', () => {
  let movieService;
  let movieRepository;
  let mockMovie;

  beforeEach(async () => {
    mockMovie = new MockMovie();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: MovieRepository, useFactory: mockMovieRepository },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<MovieRepository>(MovieRepository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a movie successfully', async () => {
      movieRepository.create.mockReturnValue(mockMovie);
      movieRepository.save.mockResolvedValue(mockMovie);

      const postMovieDto: PostMovieDto = {
        title: 'Test Movie',
        description: 'This is a test movie',
        youtubeUrl: 'http://youtube.com/test',
        bigImgUrl: 'http://bigimg.com/test',
        thumbNailUrl: 'http://thumbnail.com/test',
      };
      const result = await movieService.create(postMovieDto);

      expect(movieRepository.create).toHaveBeenCalledWith(postMovieDto);
      expect(movieRepository.save).toHaveBeenCalledWith(mockMovie);

      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Test Movie');
      expect(result.description).toEqual('This is a test movie');
    });
  });

  describe('findOne', () => {
    it('should find a movie successfully', async () => {
      movieRepository.findById.mockResolvedValue(mockMovie);

      const result = await movieService.findOne(1);

      expect(movieRepository.findById).toHaveBeenCalledWith(1);
      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Test Movie');
      expect(result.description).toEqual('This is a test movie');
    });

    it('should throw an error if movie is not found', async () => {
      movieRepository.findById.mockResolvedValue(null);

      await expect(movieService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return paginated movies', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };
      const paginatedResult: [Partial<Movie>[], number] = [[mockMovie], 1];

      movieRepository.findPaginatedMovies.mockResolvedValue(paginatedResult);

      const result = await movieService.findAll(paginationDto);

      expect(result.data[0].id).toEqual(1);
      expect(result.data[0].title).toEqual('Test Movie');
    });

    it('should handle errors when fetching movies', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };

      movieRepository.findPaginatedMovies.mockRejectedValue(new Error('Error fetching movies'));

      await expect(movieService.findAll(paginationDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a movie successfully', async () => {
      movieRepository.findById.mockResolvedValue(mockMovie);
      movieRepository.save.mockResolvedValue(mockMovie);

      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie',
        description: 'Updated description',
        youtubeUrl: 'http://youtube.com/updated',
        bigImgUrl: 'http://bigimg.com/updated',
        thumbNailUrl: 'http://thumbnail.com/updated'
      };

      const result = await movieService.update(1, updateMovieDto);

      expect(movieRepository.findById).toHaveBeenCalledWith(1);
      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Updated Movie');
    });

    it('should throw an error if movie is not found', async () => {
      movieRepository.findById.mockResolvedValue(null);

      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie',
        description: 'Updated description',
        youtubeUrl: 'http://youtube.com/updated',
        bigImgUrl: 'http://bigimg.com/updated',
        thumbNailUrl: 'http://thumbnail.com/updated'
      };

      await expect(movieService.update(1, updateMovieDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a movie successfully', async () => {
      movieRepository.findById.mockResolvedValue(mockMovie);
      movieRepository.delete.mockResolvedValue({ affected: 1 });

      await movieService.remove(1);

      expect(movieRepository.findById).toHaveBeenCalledWith(1);
      expect(movieRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if movie is not found', async () => {
      movieRepository.findById.mockResolvedValue(null);

      await expect(movieService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
