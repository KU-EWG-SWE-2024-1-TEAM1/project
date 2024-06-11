import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from "./entity/Post";
import { PostController } from "./controller/PostController";
import { PostService } from "./service/PostService";
import { User } from "../user/entity/User";
import { UserService } from "../user/service/UserService";
import { UserModule } from "../user/module";


@Module({
  imports: [TypeOrmModule.forFeature([Post,User]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService,UserService],
})
export class PostModule {}
