import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../post/entity/Post";
import { User } from "../user/entity/User";
import { PostService } from "../post/service/PostService";
import { UserService } from "../user/service/UserService";
import { Movie } from "../movie/entity/Movie";
import { Comment } from "../comment/entity/Comment";
import { PostRepository } from "../post/repository/PostRepository";
import { UserRepository } from "../user/repository/UserRepository";
import { MovieService } from "../movie/service/MovieService";
import { CommentService } from "../comment/service/CommentService";
import { CommentRepository } from "../comment/repository/CommentRepository";
import { MovieRepository } from "../movie/repository/MovieRepository";

@Module({
  imports: [TypeOrmModule.forFeature([Post, User,Movie,Comment])],
  providers: [
    UserService,UserRepository,
    PostService,PostRepository,
    MovieService,MovieRepository,
    CommentService,CommentRepository
    ],
  exports: [
    UserService,UserRepository,
    PostService,PostRepository,
    MovieService,MovieRepository,
    CommentService,CommentRepository],
})
export class DataModule {}