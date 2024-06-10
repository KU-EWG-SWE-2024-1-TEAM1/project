import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from '../../src/modules/post/service/PostService';
import { Post } from '../../src/modules/post/entity/Post';
import { User } from '../../src/modules/user/entity/User';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PaginationDto } from '../../src/utils/pagination/paginationDto';
import { ResponsePostDto, PostPostDto, UpdatePostDto } from '../../src/modules/post/dto/PostDto';
import { AuthorUserDto } from '../../src/modules/user/dto/UserDto';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  posts: [],
};

const mockAuthorUserDto: AuthorUserDto = {
  id: 1,
  name: 'Test User',
};

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  content: 'This is a test post',
  user: mockUser,
};

const mockResponsePostDto: ResponsePostDto = {
  id: 1,
  title: 'Test Post',
  content: 'This is a test post',
  user: mockAuthorUserDto,
};

const updatedPost: Post = {
  id: 1,
  title: 'Updated Post',
  content: 'This is an updated post',
  user: mockUser,
};

const updatedResponsePostDto: ResponsePostDto = {
  id: 1,
  title: 'Updated Post',
  content: 'This is an updated post',
  user: mockAuthorUserDto,
};

const mockPostRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockImplementation(post => post),
  findOne: jest.fn().mockResolvedValue(mockPost),
  find: jest.fn().mockResolvedValue([mockPost]),
  findAndCount: jest.fn().mockResolvedValue([[mockPost], 1]),
  delete: jest.fn().mockResolvedValue({ raw: '', affected: 1 }),
};

const mockUserRepository = {
  findOne: jest.fn().mockResolvedValue(mockUser),
};

describe('PostService', () => {
  let service: PostService;
  let postRepository: Repository<Post>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', async () => {
    const postDto: PostPostDto = { title: 'Test Post', content: 'This is a test post', userId: 1 };
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);
    jest.spyOn(postRepository, 'save').mockResolvedValueOnce(mockPost);

    expect(await service.create(postDto)).toEqual(mockResponsePostDto);
    expect(postRepository.save).toHaveBeenCalled();
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should find a post by id', async () => {
    jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(mockPost);

    expect(await service.findOne(1)).toEqual(mockResponsePostDto);
    expect(postRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['user'] });
  });

  it('should throw an error if post not found', async () => {
    jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('should return paginated posts', async () => {
    const paginationDto: PaginationDto = { page: 1, limit: 10, field: 'id', order: 'ASC' };
    jest.spyOn(postRepository, 'findAndCount').mockResolvedValueOnce([[mockPost], 1]);

    expect(await service.findAll(paginationDto)).toEqual({
      data: [mockResponsePostDto],
      total: 1,
      page: 1,
      limit: 10,
    });
    expect(postRepository.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      order: { id: 'ASC' },
      relations: ['user'],
    });
  });

  it('should update a post', async () => {
    const updateDto: UpdatePostDto = { title: 'Updated Post', content: 'This is an updated post' };
    jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(mockPost);
    jest.spyOn(postRepository, 'save').mockResolvedValueOnce(updatedPost);

    const updatedPostEntity = {
      ...mockPost,
      ...updateDto,
    };

    const updatedPostResult = {
      ...updatedPostEntity,
      user: mockAuthorUserDto,
    };

    expect(await service.update(1, updateDto)).toEqual(updatedResponsePostDto);
    expect(postRepository.save).toHaveBeenCalledWith(expect.objectContaining(updatedPostResult));
  });

  it('should delete a post', async () => {
    jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(mockPost);
    jest.spyOn(postRepository, 'delete').mockResolvedValueOnce({ raw: '', affected: 1 });

    await service.remove(1);
    expect(postRepository.delete).toHaveBeenCalledWith(mockPost.id);
  });

  it('should throw a BadRequestException on save error', async () => {
    const postDto: PostPostDto = { title: 'Test Post', content: 'This is a test post', userId: 1 };
    jest.spyOn(postRepository, 'save').mockRejectedValueOnce(new Error());

    await expect(service.create(postDto)).rejects.toThrow(BadRequestException);
  });
});
