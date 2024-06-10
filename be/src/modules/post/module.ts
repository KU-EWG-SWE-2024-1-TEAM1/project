import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from "./entity/Post";
import { PostController } from "./controller/PostController";
import { PostService } from "./service/PostService";
import { PostRepository } from "./repository/PostRepository";
import { User } from "../user/entity/User";


@Module({
  imports: [TypeOrmModule.forFeature([Post,User]),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
