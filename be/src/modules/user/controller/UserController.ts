import {Controller,Get,Post,Body,Param,Delete,UsePipes,ValidationPipe,Patch,ParseIntPipe} from '@nestjs/common';
import { UserService } from '../service/UserService';
import { User } from '../entity/User';
import {PostUserDto, UpdateUserDto} from "../dto/UserDto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() postUserDto: PostUserDto): Promise<User> {
        return this.userService.create(postUserDto);
    }

    @Patch(':id')
    async updatePartialUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.remove(+id);
    }
}
