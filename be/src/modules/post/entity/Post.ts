import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
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

  @Column({ length: 255, default:'' })
  type: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  views: number;

  @Column({ length: 255, nullable: true })
  thumbnailURL: string;

  @Column('simple-array', { nullable: true })
  photosURL: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(() => Movie, movie => movie.posts)
  movie: Movie;
}