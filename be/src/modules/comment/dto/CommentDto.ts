import { IsInt, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class PostCommentDto {
  @IsInt()
  user_id: number;

  @IsInt()
  post_id: number;

  @IsInt()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;
}

export class ResponseCommentDto {
  id: number;
  user_id: number;
  post_id: number;
  rating: number;
  comment: string;
}