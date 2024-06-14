import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToOne,JoinColumn,BaseEntity,CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../user/entity/User';
import { Comment } from '../../comment/entity/Comment';
import { Movie } from "../../movie/entity/Movie";

@Entity()
export class Post extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToOne(() => Comment, comment => comment.post)
  @JoinColumn()
  comment: Comment;

  @ManyToOne(() => Movie, movie => movie.posts)
  movie: Movie;
}