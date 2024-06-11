import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionService } from "./service/ConnectionService";
import { ConnectionController } from './controller/ConnectionController';
import { Connection } from './entity/Connection';
import { ConnectionRepository } from "./repository/ConnectionRepository";

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  controllers: [ConnectionController],
  providers: [ConnectionService,ConnectionRepository],
})
export class ConnectionModule {}
