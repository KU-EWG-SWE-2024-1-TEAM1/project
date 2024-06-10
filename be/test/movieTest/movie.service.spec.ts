import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/modules/movie/service/MovieService';
import { MovieRepository } from '../../src/modules/movie/repository/MovieRepository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PostMovieDto, UpdateMovieDto } from '../../src/modules/movie/dto/MovieDto';

const mockMovieRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('MovieService', () => {
  let service: MovieService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: MovieRepository, useFactory: mockMovieRepository },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Other test cases will go here...
  describe('create', () => {
    it('should create a movie', async () => {
      const postMovieDto: PostMovieDto = {
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
      };

      const savedMovie = {
        id: 1,
        ...postMovieDto,
        totalScore: 0,
        ratingCount: 0,
        searchCount: 0,
      };

      repository.create.mockReturnValue(savedMovie);
      repository.save.mockResolvedValue(savedMovie);

      const result = await service.create(postMovieDto);

      expect(result).toEqual({
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: postMovieDto.releaseDate,
        averageScore: 0,
        searchCount: 0,
      });
    });

    it('should throw an error if creation fails', async () => {
      const postMovieDto: PostMovieDto = {
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
      };

      repository.create.mockReturnValue(postMovieDto);
      repository.save.mockRejectedValue(new Error('Failed to create movie'));

      await expect(service.create(postMovieDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const movie = {
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
        totalScore: 0,
        ratingCount: 0,
        searchCount: 0,
      };

      repository.findOne.mockResolvedValue(movie);

      const result = await service.findOne(1);

      expect(result).toEqual({
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: movie.releaseDate,
        averageScore: 0,
        searchCount: 0,
      });
    });

    it('should throw NotFoundException if movie not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Title',
      };

      const movie = {
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
        totalScore: 0,
        ratingCount: 0,
        searchCount: 0,
      };

      const updatedMovie = { ...movie, ...updateMovieDto };

      repository.findOne.mockResolvedValue(movie);
      repository.save.mockResolvedValue(updatedMovie);

      const result = await service.update(1, updateMovieDto);

      expect(result).toEqual({
        id: 1,
        title: 'Updated Title',
        description: 'Test Description',
        releaseDate: movie.releaseDate,
        averageScore: 0,
        searchCount: 0,
      });
    });

    it('should throw NotFoundException if movie not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(1, { title: 'Updated Title' })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if update fails', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Title',
      };

      const movie = {
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
        totalScore: 0,
        ratingCount: 0,
        searchCount: 0,
      };

      repository.findOne.mockResolvedValue(movie);
      repository.save.mockRejectedValue(new Error('Failed to update movie'));

      await expect(service.update(1, updateMovieDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      const movie = {
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
        totalScore: 0,
        ratingCount: 0,
        searchCount: 0,
      };

      repository.findOne.mockResolvedValue(movie);
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if movie not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if removal fails', async () => {
      const movie = {
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date(),
        totalScore: 0,
        ratingCount: 0,
        searchCount: 0,
      };

      repository.findOne.mockResolvedValue(movie);
      repository.delete.mockRejectedValue(new Error('Failed to delete movie'));

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });

});
