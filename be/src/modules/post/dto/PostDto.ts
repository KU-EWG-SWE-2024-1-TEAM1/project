import { IsString, IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { AuthorUserDto } from '../../user/dto/UserDto';

export class PostPostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @Type(() => Number)
  @IsInt()
  userId: number;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}


export class ResponsePostDto {
  id: number;
  title: string;
  content: string;
  user: AuthorUserDto;
}