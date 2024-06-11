import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/User';
import { Comment } from '../../comment/entity/Comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  // @ManyToOne(() => Movie, movie => movie.posts)
  // movie: Movie;

  @OneToOne(() => Comment, comment => comment.post)
  @JoinColumn()
  comment: Comment;
}