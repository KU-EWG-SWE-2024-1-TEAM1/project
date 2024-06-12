import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "../../post/entity/Post";
import { Comment } from '../../comment/entity/Comment';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}