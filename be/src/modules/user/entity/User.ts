import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from "typeorm";
import { Post } from "../../post/entity/Post";
import { Comment } from '../../comment/entity/Comment';
import * as bcrypt from 'bcrypt';
import { Role } from "../../../auth/authorization/Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column({ default: '' })
    password: string;

    @Column({ default: '' })
    salt: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, this.salt);
        }
    }

    @Column({ type: 'varchar', length: 5, default: Role.User })
    role: Role;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}