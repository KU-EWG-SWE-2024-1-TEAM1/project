import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controller/MovieController';
import { MovieService } from './service/MovieService';
import { MovieRepository } from './repository/MovieRepository';
import { Movie } from './entity/Movie';
import { DataModule } from "../data/module";

@Module({
  imports: [TypeOrmModule.forFeature([Movie]),DataModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository,],
  exports:[MovieService,MovieRepository]
})
export class MovieModule {}