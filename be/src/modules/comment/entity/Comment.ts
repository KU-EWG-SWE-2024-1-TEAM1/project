import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../user/entity/User';
import { Post } from '../../post/entity/Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column('text')
  comment: string;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @OneToOne(() => Post, post => post.comment)
  @JoinColumn()
  post: Post;
}