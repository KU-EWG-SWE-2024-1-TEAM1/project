import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { PostUserDto, UpdateUserDto } from '../dto/UserDto';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async create(postUserDto: PostUserDto): Promise<User> {
        const user = this.userRepository.create(postUserDto);
        return this.checkError(() => this.userRepository.save(user), 'Failed to create user');
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        this.ensureExists(user, id);
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.checkError(() => this.userRepository.find(), 'Failed to fetch users');
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return this.checkError(() => this.userRepository.save(user), 'Failed to update user');
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.checkError(() => this.userRepository.delete(user.id), 'Failed to delete user');
    }

    private ensureExists(user: User, id: number): void {
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    private async checkError<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            throw new BadRequestException(errorMessage);
        }
    }
}

