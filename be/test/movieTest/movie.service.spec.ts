import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/modules/movie/service/MovieService';
import { MovieRepository } from '../../src/modules/movie/repository/MovieRepository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PostMovieDto, UpdateMovieDto } from '../../src/modules/movie/dto/MovieDto';
import { Movie } from "../../src/modules/movie/entity/Movie";
import { PaginationResult } from "../../src/utils/pagination/pagination";
import { PaginationDto } from "../../src/utils/pagination/paginationDto";

const mockMovieRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const mockMovie: Partial<Movie> = {
  id: 1,
  title: 'Test Movie',
  description: 'Test Description',
  bigImgUrl: 'big.jpg',
  thumbNailUrl: 'thumb.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
  posts: [],
};

describe('MovieService', () => {
  let service: MovieService;
  let movieRepository: ReturnType<typeof mockMovieRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: MovieRepository, useFactory: mockMovieRepository },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    movieRepository =  module.get(MovieRepository);
  });

  describe('create', () => {
    it('should create a movie successfully', async () => {
      const postMovieDto: PostMovieDto = {
        title: 'Test Movie',
        description: 'Test Description',
        bigImgUrl: 'big.jpg',
        thumbNailUrl: 'thumb.jpg',
      };

      movieRepository.create.mockReturnValue(mockMovie);
      movieRepository.save.mockResolvedValue(mockMovie);

      const result = await service.create(postMovieDto);

      expect(movieRepository.create).toHaveBeenCalledWith(postMovieDto);
      expect(movieRepository.save).toHaveBeenCalledWith(mockMovie);
      expect(result).toEqual(expect.objectContaining(postMovieDto));
    });

    it('should throw a BadRequestException if movie creation fails', async () => {
      const postMovieDto: PostMovieDto = {
        title: 'Test Movie',
        description: 'Test Description',
        bigImgUrl: 'big.jpg',
        thumbNailUrl: 'thumb.jpg',
      };

      movieRepository.create.mockReturnValue(mockMovie);
      movieRepository.save.mockRejectedValue(new Error('Failed to create movie'));

      await expect(service.create(postMovieDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a movie if found', async () => {
      movieRepository.findById.mockResolvedValue(mockMovie);

      const result = await service.findOne(1);

      expect(movieRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expect.objectContaining({
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
      }));
    });

    it('should throw NotFoundException if movie is not found', async () => {
      movieRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all movies with pagination', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'title', order: 'ASC' };
      const resultData: PaginationResult<Movie> = {
        data: [mockMovie as Movie],
        total: 1,
        page: 1,
        limit: 10,
      };

      jest.spyOn(service as any, 'handleErrors').mockImplementation(() => Promise.resolve(resultData));

      const result = await service.findAll(paginationDto);

      expect(result).toEqual(expect.objectContaining({
        data: [expect.objectContaining({
          id: 1,
          title: 'Test Movie',
          description: 'Test Description',
        })],
        total: 1,
        page: 1,
        limit: 10,
      }));
    });
  });

  describe('update', () => {
    it('should update a movie successfully', async () => {
      const updateMovieDto: UpdateMovieDto = { bigImgUrl: "", thumbNailUrl: "", title: 'Updated Movie' };
      const updatedMovie = { ...mockMovie, ...updateMovieDto };

      movieRepository.findById.mockResolvedValue(mockMovie);
      movieRepository.save.mockResolvedValue(updatedMovie);

      const result = await service.update(1, updateMovieDto);

      expect(movieRepository.findById).toHaveBeenCalledWith(1);
      expect(movieRepository.save).toHaveBeenCalledWith(updatedMovie);
      expect(result).toEqual(expect.objectContaining(updateMovieDto));
    });

    it('should throw NotFoundException if movie is not found', async () => {
      movieRepository.findById.mockResolvedValue(null);

      const updateMovieDto: UpdateMovieDto = { bigImgUrl: "", thumbNailUrl: "", title: 'Updated Movie' };

      await expect(service.update(1, updateMovieDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if update fails', async () => {
      const updateMovieDto: UpdateMovieDto = { bigImgUrl: "", thumbNailUrl: "", title: 'Updated Movie' };

      movieRepository.findById.mockResolvedValue(mockMovie);
      movieRepository.save.mockRejectedValue(new Error('Failed to update movie'));

      await expect(service.update(1, updateMovieDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a movie successfully', async () => {
      movieRepository.findOne.mockResolvedValue(mockMovie);
      movieRepository.delete.mockResolvedValue(null);

      await service.remove(1);

      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(movieRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if movie is not found', async () => {
      movieRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if delete fails', async () => {
      movieRepository.findOne.mockResolvedValue(mockMovie);
      movieRepository.delete.mockRejectedValue(new Error('Failed to delete movie'));

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });
});