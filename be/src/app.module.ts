import * as dotenv from 'dotenv';
dotenv.config();
import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/dbconfig';
import {ConnectionModule} from "./modules/connection/module";
import { AuthModule } from "./auth/module";
import { DataModule } from "./modules/data/module";
import { UserModule } from "./modules/user/module";
import { PostModule } from "./modules/post/module";
import { MovieModule } from "./modules/movie/module";
import { CommentModule } from "./modules/comment/module";
import { loadYamlConfig } from "./config/yamlConfig";
import {RedirectMiddleware} from "./middleware/RedirectMiddleware";

const ENV = process.env.NODE_ENV || 'dev';
const configFilePath = `config/${ENV}.yaml`;
const config = loadYamlConfig(configFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        ...getTypeOrmConfig(configService),
        autoLoadEntities: true,
      }),

      inject: [ConfigService],

    }),
    ConnectionModule,DataModule,AuthModule,
    UserModule,PostModule,MovieModule,CommentModule
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(RedirectMiddleware)
        .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}