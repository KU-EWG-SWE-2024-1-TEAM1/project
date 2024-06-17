import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/user/entity/User';
import { Post } from "../modules/post/entity/Post";
import { Movie } from "../modules/movie/entity/Movie";
import { Comment } from "../modules/comment/entity/Comment";

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const dbType = configService.get<'sqlite' | 'mysql'>('db.type');
  const commonOptions = {
    type: dbType,
    database: configService.get<string>('db.database'),
    synchronize: configService.get<boolean>('db.synchronize'),
    logging: configService.get<boolean>('db.logging'),
    entities: [User,Post,Movie,Comment],
    autoLoadEntities: true,
  };

  if (dbType === 'mysql') {
    return {
      ...commonOptions,
      host: configService.get<string>('db.host'),
      port: configService.get<number>('db.port'),
      username: configService.get<string>('db.username'),
      password: configService.get<string>('db.password'),
    } as TypeOrmModuleOptions;
  }

  return commonOptions as TypeOrmModuleOptions;
};
