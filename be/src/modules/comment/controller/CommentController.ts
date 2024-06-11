import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, Patch } from "@nestjs/common";
import { CommentService } from '../service/CommentService';
import { PostCommentDto } from '../dto/CommentDto';
import { UpdateCommentDto } from '../dto/CommentDto';
import { ResponseCommentDto } from '../dto/CommentDto';

@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: PostCommentDto): Promise<ResponseCommentDto> {
    return this.commentService.create(createCommentDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ResponseCommentDto> {
    return this.commentService.findById(id);
  }
  @Get('post/:postId')
  async findByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<ResponseCommentDto> {
    return this.commentService.findByPostId(postId);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto): Promise<ResponseCommentDto> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}