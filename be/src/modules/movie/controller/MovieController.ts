import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { MovieService } from '../service/MovieService';
import { PostMovieDto, UpdateMovieDto, ResponseMovieDto } from '../dto/MovieDto';
import { PaginationDto } from "../../../utils/pagination/paginationDto";
import { PaginationResult } from "../../../utils/pagination/pagination";

@Controller('api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResult<ResponseMovieDto>> {
    return this.movieService.findAll(paginationDto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() postMovieDto: PostMovieDto): Promise<ResponseMovieDto> {
    return this.movieService.create(postMovieDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseMovieDto> {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<ResponseMovieDto> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieService.remove(id);
  }
}
