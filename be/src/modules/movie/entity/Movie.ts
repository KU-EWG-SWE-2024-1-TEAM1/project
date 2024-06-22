import { Column, Entity, OneToMany, PrimaryGeneratedColumn ,BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Post } from "../../post/entity/Post";

@Entity()
export class Movie extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  bigImgUrl: string;

  @Column()
  thumbNailUrl: string;

  @Column()
  youtubeUrl: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, post => post.movie)
  posts: Post[]

}