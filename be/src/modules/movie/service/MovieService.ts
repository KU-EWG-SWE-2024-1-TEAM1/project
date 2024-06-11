import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRepository } from '../repository/MovieRepository';
import { Movie } from '../entity/Movie';
import { PostMovieDto, UpdateMovieDto, ResponseMovieDto } from '../dto/MovieDto';
import { paginate, PaginationResult } from "../../../utils/pagination/pagination";
import { PaginationDto } from "../../../utils/pagination/paginationDto";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {}

  async create(postMovieDto: PostMovieDto): Promise<ResponseMovieDto> {
    const movie = this.movieRepository.create(postMovieDto);
    const savedMovie = await this.checkError(() => this.movieRepository.save(movie), 'Failed to create movie');
    return this.toResponseMovieDto(savedMovie);
  }

  async findOne(id: number): Promise<ResponseMovieDto> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    this.ensureExists(movie, id);
    return this.toResponseMovieDto(movie);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<ResponseMovieDto>> {
    const { page, limit, field, order } = paginationDto;
    const result = await this.handleErrors(
      () => paginate(this.movieRepository, { page, limit, field, order }),
      'Failed to fetch movies',
    );

    return {
      data: result.data.map(movie => this.toResponseMovieDto(movie)),
      total: result.total,
      page,
      limit,
    };
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<ResponseMovieDto> {
    const movie = await this.movieRepository.findById(id);
    this.ensureExists(movie, id);
    Object.assign(movie, updateMovieDto);
    const updatedMovie = await this.checkError(() => this.movieRepository.save(movie), 'Failed to update movie');
    return this.toResponseMovieDto(updatedMovie);
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

  private async handleErrors<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw new BadRequestException(errorMessage);
    }
  }

  private toResponseMovieDto(movie: Movie): ResponseMovieDto {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      searchCount: movie.searchCount,
      averageScore: movie.ratingCount ? movie.totalScore / movie.ratingCount : 0,
    };
  }
}
