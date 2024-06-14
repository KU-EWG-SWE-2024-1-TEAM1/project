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
  Query,
  UseGuards,
  Request
} from "@nestjs/common";
import { PostService } from '../service/PostService';
import { PostPostDto, ResponsePostDto, UpdatePostDto } from '../dto/PostDto';
import { PaginationResult } from '../../../utils/pagination/pagination';
import { PaginationDto } from '../../../utils/pagination/paginationDto';
import { AuthGuard } from "../../../auth/JwtAuthGuard/JwtAuthGuard";
import { RolesGuard } from "../../../auth/authorization/RolesGuard";
import { Roles } from "../../../auth/authorization/decorator";
import { Role } from "../../../auth/authorization/Role";

@Controller('api/posts')
@UsePipes(new ValidationPipe())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.User)
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResult<ResponsePostDto>> {
    return this.postService.findAll(paginationDto);
  }

  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() postPostDto: PostPostDto, @Request() request: any): Promise<any> {
    return this.postService.create(postPostDto, request.user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponsePostDto> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.User)
  async update(@Param('id', ParseIntPipe) id: number,@Body() updatePostDto: UpdatePostDto,@Request() request: any): Promise<ResponsePostDto> {
    return this.postService.update(id, updatePostDto, request.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.User)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postService.remove(id);
  }
}

