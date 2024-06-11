import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from "./entity/Post";
import { PostController } from "./controller/PostController";
import { PostService } from "./service/PostService";
import { User } from "../user/entity/User";
import { UserRepository } from "../user/repository/UserRepository";
import { UserService } from "../user/service/UserService";
import { PostRepository } from "./repository/PostRepository";


@Module({
  imports: [TypeOrmModule.forFeature([Post,User]),
  ],
  controllers: [PostController],
  providers: [PostService,PostRepository, UserService,UserRepository],
  exports: [PostService, PostRepository],
})
export class PostModule {}
