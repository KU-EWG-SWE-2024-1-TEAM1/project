import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { User } from './entity/User';
import { UserRepository } from "./repository/UserRepository";
import { DataModule } from "../data/module";

@Module({
    imports: [TypeOrmModule.forFeature([User]),DataModule],
    controllers: [UserController],
    providers: [UserService,UserRepository,],
    exports: [UserService,UserRepository],
})
export class UserModule {}
