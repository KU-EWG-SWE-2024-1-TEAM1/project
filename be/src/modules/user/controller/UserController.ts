import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    Patch,
    ParseIntPipe,
    UseGuards
} from "@nestjs/common";
import { UserService } from '../service/UserService';
import { PostUserDto, UpdateUserDto, ResponseUserDto } from '../dto/UserDto';
import { AuthGuard } from "../../../auth/JwtAuthGuard/JwtAuthGuard";
import { Role } from "../../../auth/authorization/Role";
import { Roles } from "../../../auth/authorization/decorator";
import { RolesGuard } from "../../../auth/authorization/RolesGuard";

@Controller('api/users')
@UsePipes(new ValidationPipe())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin)
    async findAll(): Promise<ResponseUserDto[]> {
        return this.userService.findAll();
    }

    @Post()
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
