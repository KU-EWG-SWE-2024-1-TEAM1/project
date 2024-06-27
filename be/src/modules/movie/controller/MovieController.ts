import {Controller,Get,Post,Patch,Delete,Param,Body,UsePipes,ValidationPipe,ParseIntPipe,Query, UseGuards} from "@nestjs/common";
import { MovieService } from '../service/MovieService';
import {PostMovieDto, UpdateMovieDto, ResponseMovieDto, ShortMovieDto} from '../dto/MovieDto';
import { PaginationDto } from "../../../utils/pagination/paginationDto";
import { PaginationResult } from "../../../utils/pagination/pagination";
import { AuthGuard } from "../../../auth/JwtAuthGuard/JwtAuthGuard";
import { RolesGuard } from "../../../auth/authorization/RolesGuard";
import { Roles } from "../../../auth/authorization/decorator";
import { Role } from "../../../auth/authorization/Role";

@Controller('api/movies')
@UsePipes(new ValidationPipe())
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResult<ShortMovieDto>> {
    return this.movieService.findAll(paginationDto);
  }

  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() postMovieDto: PostMovieDto): Promise<ResponseMovieDto> {
    return this.movieService.create(postMovieDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseMovieDto> {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<ResponseMovieDto> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieService.remove(id);
  }
}
