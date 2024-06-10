import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entity/Post';
import { PostPostDto, UpdatePostDto, ResponsePostDto } from '../dto/PostDto';
import { paginate, PaginationResult } from '../../../utils/pagination/pagination';
import { PaginationDto } from '../../../utils/pagination/paginationDto';
import { User } from '../../user/entity/User';
import { mapToDto } from '../../../utils/mapper/mapper';
import { AuthorUserDto } from '../../user/dto/UserDto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(postPostDto: PostPostDto): Promise<ResponsePostDto> {
    const userId = parseInt(postPostDto.userId.toString(), 10);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const post = this.postRepository.create({
      ...postPostDto,
      user,
    });

    const savedPost = await this.checkError(() => this.postRepository.save(post), 'Failed to create post');
    return this.toResponsePostDto(savedPost);
  }

  async findOne(id: number): Promise<ResponsePostDto> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });
    this.ensureExists(post, id);
    return this.toResponsePostDto(post);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<ResponsePostDto>> {
    const { page, limit, field, order } = paginationDto;
    const result = await this.handleErrors(
      () => paginate(this.postRepository, { page, limit, field, order }, { relations: ['user'] }),
      'Failed to fetch posts',
    );

    return {
      data: result.data.map(post => this.toResponsePostDto(post)),
      total: result.total,
      page,
      limit,
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<ResponsePostDto> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    const updatedPost = await this.checkError(() => this.postRepository.save(post), 'Failed to update post');
    return this.toResponsePostDto(updatedPost);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.checkError(() => this.postRepository.delete(post.id), 'Failed to delete post');
  }

  private ensureExists(post: Post, id: number): void {
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
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

  private toResponsePostDto(post: Post): ResponsePostDto {
    const userAuthorDto = mapToDto(post.user, AuthorUserDto, { id: 'id', name: 'name' });
    const responsePostDto = mapToDto(post, ResponsePostDto, { id: 'id', title: 'title', content: 'content' });
    responsePostDto.user = userAuthorDto;
    return responsePostDto;
  }
}
