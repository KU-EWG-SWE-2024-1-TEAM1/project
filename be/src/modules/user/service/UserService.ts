import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/User";
import { PostUserDto, ResponseUserDto, UpdateUserDto } from "../dto/UserDto";
import { UserRepository } from "../repository/UserRepository";
import { mapToDto } from "../../../utils/mapper/Mapper";

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(UserRepository)
      private readonly userRepository: UserRepository,
    ) {}

    async create(postUserDto: PostUserDto): Promise<ResponseUserDto> {
        await this.ensureEmailNotExists(postUserDto.email);
        const user = this.userRepository.create(postUserDto);
        const savedUser = await this.checkError(() => this.userRepository.save(user), 'Failed to create user');
        return mapToDto(savedUser,ResponseUserDto);
    }

    async findOne(id: number): Promise<ResponseUserDto> {
        const user = await this.userRepository.findById(id);
        this.ensureExists(user, id);
        return mapToDto(user,ResponseUserDto);
    }

    async findMe(email: string): Promise<ResponseUserDto> {
        const user = await this.userRepository.findByEmail(email);
        this.ensureExists(user, 0);
        return mapToDto(user,ResponseUserDto);
    }
    async findById(id: number): Promise<User> {
       const user = await this.userRepository.findById(id);
       this.ensureExists(user,id);
       return user;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findByEmail(email);
    }

    async findAll(): Promise<ResponseUserDto[]> {
        const users = await this.checkError(() => this.userRepository.find(), 'Failed to fetch users');
        return users.map(user => mapToDto(user,ResponseUserDto));
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        const updatedUser = await this.checkError(() => this.userRepository.save(user), 'Failed to update user');
        return mapToDto(updatedUser,ResponseUserDto);
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

    async ensureEmailNotExists(email: string): Promise<void> {
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

}
