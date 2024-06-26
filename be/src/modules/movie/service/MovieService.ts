import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRepository } from '../repository/MovieRepository';
import { Movie } from '../entity/Movie';
import {PostMovieDto, UpdateMovieDto, ResponseMovieDto, ShortMovieDto} from '../dto/MovieDto';
import { paginate, PaginationResult } from "../../../utils/pagination/pagination";
import { PaginationDto } from "../../../utils/pagination/paginationDto";
import { mapToDto } from "../../../utils/mapper/Mapper";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {}

  async create(postMovieDto: PostMovieDto): Promise<ResponseMovieDto> {
    const movie = this.movieRepository.create(postMovieDto);
    const savedMovie = await this.checkError(() => this.movieRepository.save(movie), 'Failed to create movie');
    return mapToDto(savedMovie,ResponseMovieDto);
  }

  async findOne(id: number): Promise<ResponseMovieDto> {
    const movie = await this.movieRepository.findById(id);
    this.ensureExists(movie, id);
    return mapToDto(movie,ResponseMovieDto);
  }
  async findById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);
    this.ensureExists(movie, id);
    return movie;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<ShortMovieDto>> {
    const { page = 1, limit = 10, field = 'id', order = 'ASC' } = paginationDto;
    const [movies, total] = await this.movieRepository.findPaginatedMovies(page, limit, field, order.toUpperCase() as 'ASC' | 'DESC');

    return {
      data: movies.map(movie => mapToDto(movie, ShortMovieDto)),
      total,
      page,
      limit,
    };
  }
  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<ResponseMovieDto> {
    const movie = await this.movieRepository.findById(id);
    this.ensureExists(movie, id);
    Object.assign(movie, updateMovieDto);
    const updatedMovie = await this.checkError(() => this.movieRepository.save(movie), 'Failed to update movie');
    return mapToDto(updatedMovie,ResponseMovieDto);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    this.ensureExists(movie, id);
    await this.checkError(() => this.movieRepository.delete(id), 'Failed to delete movie');
  }

  private ensureExists(movie: Movie, id: number): void {
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  private async checkError<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw new BadRequestException(errorMessage);
    }
  }
}
