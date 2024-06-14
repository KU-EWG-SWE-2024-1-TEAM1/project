import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entity/Comment';
import { PostCommentDto, UpdateCommentDto, ResponseCommentDto } from '../dto/CommentDto';
import { CommentRepository } from "../repository/CommentRepository";
import { UserRepository } from "../../user/repository/UserRepository";
import { PostRepository } from "../../post/repository/PostRepository";
import { mapToDto } from "../../../utils/mapper/Mapper";


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async create(createCommentDto: PostCommentDto,reqUserId:number): Promise<ResponseCommentDto> {
    const { post_id, rating, comment } = createCommentDto;

    const user = await this.userRepository.findById(reqUserId);
    const post = await this.postRepository.findById(post_id);

    if (!user || !post) {
      throw new NotFoundException('User or Post not found');
    }

    const newComment = this.commentRepository.create({
      rating,
      comment,
      user,
      post,
    });
    await this.commentRepository.save(newComment);
    return mapToDto(newComment,ResponseCommentDto);
  }

  async findById(id: number): Promise<ResponseCommentDto> {
    const comment = await this.commentRepository.findById(id);
    this.checkCommentExists(comment, id);
    return mapToDto(comment,ResponseCommentDto);
  }

  async findByPostId(postId: number): Promise<ResponseCommentDto[]> {
    const comments = await this.commentRepository.findByPostId(postId);
    return comments.map(comment =>  mapToDto(comment,ResponseCommentDto));
  }

  async findByUserId(userId: number): Promise<ResponseCommentDto[]> {
    const comments = await this.commentRepository.findByUserId(userId);
    return comments.map(comment =>  mapToDto(comment,ResponseCommentDto));
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<ResponseCommentDto> {
    const comment = await this.commentRepository.findById(id);
    this.checkCommentExists(comment, id);
    Object.assign(comment, updateCommentDto);
    await this.commentRepository.save(comment);
    return  mapToDto(comment,ResponseCommentDto);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.commentRepository.findById(id);
    this.checkCommentExists(comment, id);
    await this.commentRepository.remove(comment);
  }


  private checkCommentExists(comment: Comment, id: number): void {
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}