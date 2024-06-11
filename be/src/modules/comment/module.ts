import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './service/CommentService';
import { CommentController } from './controller/CommentController';
import { Comment } from './entity/Comment';
import { CommentRepository } from "./repository/CommentRepository";
import { UserModule } from "../user/module";
import { PostModule } from "../post/module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule,  PostModule,],
  controllers: [CommentController],
  providers: [CommentService,CommentRepository],
})
export class CommentModule {}