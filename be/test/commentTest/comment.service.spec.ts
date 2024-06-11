import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from "../../src/modules/comment/service/CommentService";
import { CommentRepository } from "../../src/modules/comment/repository/CommentRepository";
import { UserRepository } from "../../src/modules/user/repository/UserRepository";
import { PostRepository } from "../../src/modules/post/repository/PostRepository";
import { NotFoundException } from '@nestjs/common';
import { PostCommentDto, UpdateCommentDto } from "../../src/modules/comment/dto/CommentDto";
import { Comment } from "../../src/modules/comment/entity/Comment";
import { User } from "../../src/modules/user/entity/User";
import { Post } from '../../src/modules/post/entity/Post';

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository: CommentRepository;
  let userRepository: UserRepository;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findById: jest.fn(),
            findByPostId: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: PostRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get<CommentRepository>(CommentRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment', async () => {
      const createCommentDto: PostCommentDto = { user_id: 1, post_id: 1, rating: 5, comment: 'Great post!' };
      const user = { id: 1 } as User;
      const post = { id: 1 } as Post;
      const comment = { id: 1, user, post, rating: 5, comment: 'Great post!' } as Comment;

      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
      jest.spyOn(postRepository, 'findById').mockResolvedValue(post);
      jest.spyOn(commentRepository, 'create').mockReturnValue(comment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(comment);

      const result = await service.create(createCommentDto);
      expect(result).toEqual(service.toResponseCommentDto(comment));
    });

    it('should throw NotFoundException if user or post not found', async () => {
      const createCommentDto: PostCommentDto = { user_id: 1, post_id: 1, rating: 5, comment: 'Great post!' };

      jest.spyOn(userRepository, 'findById').mockResolvedValue(undefined);
      jest.spyOn(postRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.create(createCommentDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return a comment', async () => {
      const user = { id: 1 } as User;
      const post = { id: 1 } as Post;
      const comment = { id: 1, user, post, rating: 5, comment: 'Great post!' } as Comment;
      jest.spyOn(commentRepository, 'findById').mockResolvedValue(comment);

      const result = await service.findById(1);
      expect(result).toEqual(service.toResponseCommentDto(comment));
    });

    it('should throw NotFoundException if comment not found', async () => {
      jest.spyOn(commentRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByPostId', () => {
    it('should return a comment', async () => {
      const user = { id: 1 } as User;
      const post = { id: 1 } as Post;
      const comment = { id: 1, user, post, rating: 5, comment: 'Great post!' } as Comment;
      jest.spyOn(commentRepository, 'findByPostId').mockResolvedValue(comment);

      const result = await service.findByPostId(1);
      expect(result).toEqual(service.toResponseCommentDto(comment));
    });

    it('should throw NotFoundException if comment not found', async () => {
      jest.spyOn(commentRepository, 'findByPostId').mockResolvedValue(undefined);

      await expect(service.findByPostId(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a comment', async () => {
      const user = { id: 1 } as User;
      const post = { id: 1 } as Post;
      const comment = { id: 1, user, post, rating: 5, comment: 'Great post!' } as Comment;
      const updateCommentDto: UpdateCommentDto = { rating: 4, comment: 'Updated comment' };

      jest.spyOn(commentRepository, 'findById').mockResolvedValue(comment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(comment);

      const result = await service.update(1, updateCommentDto);
      expect(result).toEqual(service.toResponseCommentDto(comment));
    });

    it('should throw NotFoundException if comment not found', async () => {
      const updateCommentDto: UpdateCommentDto = { rating: 4, comment: 'Updated comment' };

      jest.spyOn(commentRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.update(1, updateCommentDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a comment', async () => {
      const user = { id: 1 } as User;
      const post = { id: 1 } as Post;
      const comment = { id: 1, user, post, rating: 5, comment: 'Great post!' } as Comment;
      jest.spyOn(commentRepository, 'findById').mockResolvedValue(comment);
      jest.spyOn(commentRepository, 'remove').mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if comment not found', async () => {
      jest.spyOn(commentRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});