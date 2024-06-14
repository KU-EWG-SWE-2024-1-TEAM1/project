import { IsInt, IsString, IsNotEmpty, IsOptional, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { Field } from "../../../utils/mapper/FieldNameExtractor";
import { AuthorUserDto, ResponseUserDto } from "../../user/dto/UserDto";
import { ResponsePostDto, ShortPostDto } from "../../post/dto/PostDto";

export class PostCommentDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  post_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  comment: string;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Type(() => Number)
  comment?: string;
}

export class ResponseCommentDto {
  @Field
  id: number;
  @Field
  user: AuthorUserDto;
  @Field
  post: ShortPostDto;
  @Field
  rating: number;
  @Field
  comment: string;
}