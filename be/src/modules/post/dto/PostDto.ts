import {IsString, IsInt, IsOptional, IsArray} from "class-validator";
import { Type } from "class-transformer";
import { AuthorUserDto } from '../../user/dto/UserDto';
import { Field } from "../../../utils/mapper/FieldNameExtractor";
import {  ShortMovieDto } from "../../movie/dto/MovieDto";

export class PostPostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @Type(() => Number)
  @IsInt()
  movieId: number;

  @IsString()
  thumbnailURL: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photosURL?: string[];
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  thumbnailURL?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photosURL?: string[];
}


export class ResponsePostDto {
  @Field
  id: number;

  @Field
  title: string;

  @Field
  content: string;

  @Field
  user: AuthorUserDto;

  @Field
  movie: ShortMovieDto;

  @Field
  createdAt: Date;

  @Field
  updatedAt: Date;

  @Field
  score: number;

  @Field
  thumbnailURL: string;

  @Field
  photosURL?: string[];

}

export class ShortPostDto{
  @Field
  id: number;
  @Field
  title: string;
  @Field
  thumbnailURL: string
}