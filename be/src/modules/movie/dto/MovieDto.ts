import {  IsOptional, IsString } from "class-validator";
import { Field } from "../../../utils/mapper/FieldNameExtractor";

export class PostMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  youtubeUrl: string

  @IsString()
  bigImgUrl: string;

  @IsString()
  thumbNailUrl: string

}

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  youtubeUrl: string

  @IsString()
  @IsOptional()
  bigImgUrl: string;

  @IsString()
  @IsOptional()
  thumbNailUrl: string

}


export class ResponseMovieDto {
  @Field
  id: number;

  @Field
  title: string;

  @Field
  description: string;

  @Field
  bigImgUrl: string;

  @Field
  thumbNailUrl: string;

  @Field
  youtubeUrl: string
}

export class ShortMovieDto{
  @Field
  id: number;

  @Field
  title: string;

  @Field
  thumbNailUrl: string;
}