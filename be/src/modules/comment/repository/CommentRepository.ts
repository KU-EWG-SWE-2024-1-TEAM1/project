import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import {Comment} from "../entity/Comment";

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findByPostId(postId: number):  Promise<Comment[]>{
    return this.find({
      where: { post: { id: postId } },
      relations: ['user', 'post'],
    });
  }

  async findByUserId(userId: number): Promise<Comment[]> {
    return this.find({
      where: { user: { id: userId } },
      relations: ['user', 'post'],
    });
  }

  async findById(id: number): Promise<Comment | undefined> {
    return this.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
  }
}