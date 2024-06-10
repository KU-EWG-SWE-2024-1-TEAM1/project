import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { PostUserDto, UpdateUserDto, ResponseUserDto,} from '../dto/UserDto';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async create(postUserDto: PostUserDto): Promise<ResponseUserDto> {
        await this.ensureEmailNotExists(postUserDto.email);
        const user = this.userRepository.create(postUserDto);
        const savedUser = await this.checkError(() => this.userRepository.save(user), 'Failed to create user');
        return this.toResponseUserDto(savedUser);
    }

    async findOne(id: number): Promise<ResponseUserDto> {
        const user = await this.userRepository.findOne({ where: { id } });
        this.ensureExists(user, id);
        return this.toResponseUserDto(user);
    }

    async findAll(): Promise<ResponseUserDto[]> {
        const users = await this.checkError(() => this.userRepository.find(), 'Failed to fetch users');
        return users.map(user => this.toResponseUserDto(user));
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        const updatedUser = await this.checkError(() => this.userRepository.save(user), 'Failed to update user');
        return this.toResponseUserDto(updatedUser);
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

    private async ensureEmailNotExists(email: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            throw new BadRequestException(`Email ${email} already exists`);
        }
    }

    private async checkError<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            throw new BadRequestException(errorMessage);
        }
    }

    private toResponseUserDto(user: User): ResponseUserDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

}
