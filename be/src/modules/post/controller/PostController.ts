import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from '../service/PostService';
import { PostPostDto, ResponsePostDto, UpdatePostDto } from '../dto/PostDto';
import { PaginationResult } from '../../../utils/pagination/pagination';
import { PaginationDto } from '../../../utils/pagination/paginationDto';

@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResult<ResponsePostDto>> {
    return this.postService.findAll(paginationDto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() postDto: PostPostDto): Promise<ResponsePostDto> {
    return this.postService.create(postDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponsePostDto> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto): Promise<ResponsePostDto> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postService.remove(id);
  }
}

