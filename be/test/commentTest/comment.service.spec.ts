import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from "../../src/modules/comment/service/CommentService";
import { CommentRepository } from "../../src/modules/comment/repository/CommentRepository";
import { UserRepository } from "../../src/modules/user/repository/UserRepository";
import { PostRepository } from "../../src/modules/post/repository/PostRepository";
import { NotFoundException } from '@nestjs/common';
import { PostCommentDto,  UpdateCommentDto } from "../../src/modules/comment/dto/CommentDto";
import { User } from "../../src/modules/user/entity/User";
import { Post } from "../../src/modules/post/entity/Post";
import { Comment } from "../../src/modules/comment/entity/Comment";

const mockCommentRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findByPostId: jest.fn(),
  findByUserId: jest.fn(),
  remove: jest.fn(),
});

const mockUserRepository = () => ({
  findById: jest.fn(),
});

const mockPostRepository = () => ({
  findById: jest.fn(),
});

const mockUser: Partial<User> = {
  id: 1,
};

const mockPost: Partial<Post> = {
  id: 1,
};

const mockComment: Comment = {
  id: 1,
  rating: 5,
  comment: 'Test comment',
  user: mockUser as User,
  post: mockPost as Post,
};

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository;
  let userRepository;
  let postRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: CommentRepository, useFactory: mockCommentRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: PostRepository, useFactory: mockPostRepository },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get<CommentRepository>(CommentRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  describe('create', () => {
    it('should create a comment successfully', async () => {
      const createCommentDto: PostCommentDto = {
        user_id: 1,
        post_id: 1,
        rating: 5,
        comment: 'Test comment',
      };

      userRepository.findById.mockResolvedValue(mockUser as User);
      postRepository.findById.mockResolvedValue(mockPost as Post);
      commentRepository.create.mockReturnValue(mockComment as Comment);
      commentRepository.save.mockResolvedValue(mockComment as Comment);

      const result = await service.create(createCommentDto, 1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(postRepository.findById).toHaveBeenCalledWith(1);
      expect(commentRepository.create).toHaveBeenCalledWith({
        rating: createCommentDto.rating,
        comment: createCommentDto.comment,
        user: mockUser,
        post: mockPost,
      });
      expect(commentRepository.save).toHaveBeenCalledWith(mockComment);
      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException if user or post not found', async () => {
      userRepository.findById.mockResolvedValue(null);
      postRepository.findById.mockResolvedValue(null);

      const createCommentDto: PostCommentDto = {
        user_id: 1,
        post_id: 1,
        rating: 5,
        comment: 'Test comment',
      };

      await expect(service.create(createCommentDto, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return a comment if found', async () => {
      commentRepository.findById.mockResolvedValue(mockComment as Comment);

      const result = await service.findById(1);

      expect(commentRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      commentRepository.findById.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByPostId', () => {
    it('should return comments by post id', async () => {
      commentRepository.findByPostId.mockResolvedValue([mockComment as Comment]);

      const result = await service.findByPostId(1);

      expect(commentRepository.findByPostId).toHaveBeenCalledWith(1);
      expect(result).toEqual([mockComment]);
    });
  });

  describe('findByUserId', () => {
    it('should return comments by user id', async () => {
      commentRepository.findByUserId.mockResolvedValue([mockComment as Comment]);

      const result = await service.findByUserId(1);

      expect(commentRepository.findByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual([mockComment]);
    });
  });

  describe('update', () => {
    it('should update a comment successfully', async () => {
      const updateCommentDto: UpdateCommentDto = { rating: 4, comment: 'Updated comment' };
      const updatedComment = { ...mockComment, ...updateCommentDto };

      commentRepository.findById.mockResolvedValue(mockComment as Comment);
      commentRepository.save.mockResolvedValue(updatedComment as Comment);

      const result = await service.update(1, updateCommentDto);

      expect(commentRepository.findById).toHaveBeenCalledWith(1);
      expect(commentRepository.save).toHaveBeenCalledWith(updatedComment);
      expect(result).toEqual(updatedComment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      commentRepository.findById.mockResolvedValue(null);

      const updateCommentDto: UpdateCommentDto = { rating: 4, comment: 'Updated comment' };

      await expect(service.update(1, updateCommentDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a comment successfully', async () => {
      commentRepository.findById.mockResolvedValue(mockComment as Comment);
      commentRepository.remove.mockResolvedValue(null);

      await service.remove(1);

      expect(commentRepository.findById).toHaveBeenCalledWith(1);
      expect(commentRepository.remove).toHaveBeenCalledWith(mockComment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      commentRepository.findById.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});