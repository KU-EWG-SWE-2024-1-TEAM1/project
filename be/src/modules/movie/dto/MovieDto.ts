import {  IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class PostMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Date)
  releaseDate: Date;


}

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsOptional()
  releaseDate?: Date;

}


export class ResponseMovieDto {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  searchCount: number;
}