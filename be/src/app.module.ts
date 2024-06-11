import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/module';
import { getTypeOrmConfig } from './config/dbconfig';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { PostModule } from "./modules/post/module";
import { MovieModule } from "./modules/movie/module";
import {ConnectionModule} from "./modules/connection/module";

const ENV = process.env.NODE_ENV || 'dev';
const configFilePath = `config/${ENV}.yaml`;
const config = yaml.load(fs.readFileSync(configFilePath, 'utf8'));

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),
    ConnectionModule, UserModule,PostModule,MovieModule
  ],
})
export class AppModule {}
