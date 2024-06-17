import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from "../../src/modules/comment/service/CommentService";
import { CommentRepository } from "../../src/modules/comment/repository/CommentRepository";
import { UserRepository } from "../../src/modules/user/repository/UserRepository";
import { PostRepository } from "../../src/modules/post/repository/PostRepository";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { PostCommentDto, UpdateCommentDto } from "../../src/modules/comment/dto/CommentDto";


const mockCommentRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findByPostId: jest.fn(),
  findByUserId: jest.fn(),
  remove: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockResolvedValue({ averageRating: '4.0' }),
  }),
});

const mockUserRepository = () => ({
  findByEmail: jest.fn(),
});

const mockPostRepository = () => ({
  findById: jest.fn(),
  update: jest.fn(),
});


describe('CommentService', () => {
  let commentService: CommentService;
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

    commentService = module.get<CommentService>(CommentService);
    commentRepository = module.get<CommentRepository>(CommentRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  describe('create', () => {
    it('should create and return a comment', async () => {
      const createCommentDto: PostCommentDto = {
        postId: 1,
        rating: 4,
        comment: 'Great post!',
      };
      const reqUserEmail = 'test@example.com';
      const user = { id: 1,email: 'test@example.com'};
      const post = { id: 1, title: 'Test Post' };
      const comment = { id: 1, ...createCommentDto, user, post };

      userRepository.findByEmail.mockResolvedValue(user);
      postRepository.findById.mockResolvedValue(post);
      commentRepository.create.mockReturnValue(comment);
      commentRepository.save.mockResolvedValue(comment);

      const result = await commentService.create(createCommentDto, reqUserEmail);

      const expectedResponse = {
        id: 1,
        user: { id: 1},
        post: { id: 1, title: 'Test Post' },
        rating: 4,
        comment: 'Great post!',
      };

      expect(result).toEqual(expectedResponse);
      expect(commentRepository.create).toHaveBeenCalledWith({
        rating: 4,
        comment: 'Great post!',
        user,
        post,
      });
      expect(commentRepository.save).toHaveBeenCalledWith(comment);
    });

    it('should throw a NotFoundException if user or post not found', async () => {
      const createCommentDto: PostCommentDto = {
        postId: 1,
        rating: 4,
        comment: 'Great post!',
      };
      const reqUserEmail = 'test@example.com';

      userRepository.findByEmail.mockResolvedValue(null);
      postRepository.findById.mockResolvedValue(null);

      await expect(commentService.create(createCommentDto, reqUserEmail)).rejects.toThrow(NotFoundException);
    });

    it('should throw a ConflictException if comment already exists', async () => {
      const createCommentDto: PostCommentDto = {
        postId: 1,
        rating: 4,
        comment: 'Great post!',
      };
      const reqUserEmail = 'test@example.com';
      const user = { id: 1, email: reqUserEmail };
      const post = { id: 1, title: 'Test Post' };

      userRepository.findByEmail.mockResolvedValue(user);
      postRepository.findById.mockResolvedValue(post);
      commentRepository.findOne.mockResolvedValue({ id: 1 });

      await expect(commentService.create(createCommentDto, reqUserEmail)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should return a comment by id', async () => {
      const comment = {
        id: 1,
        rating: 4,
        comment: 'Great post!',
        user: { id: 1, email: 'test@example.com' },
        post: { id: 1, title: 'Test Post' }
      };

      commentRepository.findById.mockResolvedValue(comment);

      const result = await commentService.findById(1);

      const expectedResponse = {
        id: 1,
        user: { id: 1},
        post: { id: 1, title: 'Test Post' },
        rating: 4,
        comment: 'Great post!',
      };

      expect(result).toEqual(expectedResponse);
      expect(commentRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if comment not found', async () => {
      commentRepository.findById.mockResolvedValue(null);

      await expect(commentService.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a comment', async () => {
      const updateCommentDto: UpdateCommentDto = {
        rating: 5,
        comment: 'Updated comment',
      };
      const comment = {
        id: 1,
        rating: 4,
        comment: 'Great post!',
        user: { id: 1, email: 'test@example.com' },
        post: { id: 1, title: 'Test Post' }
      };

      commentRepository.findById.mockResolvedValue(comment);

      const updatedComment = { ...comment, ...updateCommentDto };

      commentRepository.save.mockResolvedValue(updatedComment);

      const result = await commentService.update(1, updateCommentDto);

      const expectedResponse = {
        id: 1,
        user: { id: 1},
        post: { id: 1, title: 'Test Post' },
        rating: 5,
        comment: 'Updated comment',
      };

      expect(result).toEqual(expectedResponse);
      expect(commentRepository.save).toHaveBeenCalledWith(updatedComment);
    });

    it('should throw a NotFoundException if comment not found', async () => {
      commentRepository.findById.mockResolvedValue(null);

      await expect(commentService.update(1, { rating: 5 })).rejects.toThrow(NotFoundException);
    });
  });
  describe('remove', () => {
    it('should remove a comment', async () => {
      const comment = { id: 1, rating: 4, comment: 'Great post!', post: { id: 1 } };

      commentRepository.findById.mockResolvedValue(comment);

      await commentService.remove(1);

      expect(commentRepository.remove).toHaveBeenCalledWith(comment);
    });

    it('should throw a NotFoundException if comment not found', async () => {
      commentRepository.findById.mockResolvedValue(null);

      await expect(commentService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});