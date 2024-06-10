import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Patch, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../service/UserService';
import { PostUserDto, UpdateUserDto, ResponseUserDto } from '../dto/UserDto';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<ResponseUserDto[]> {
        return this.userService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() postUserDto: PostUserDto): Promise<ResponseUserDto> {
        return this.userService.create(postUserDto);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
