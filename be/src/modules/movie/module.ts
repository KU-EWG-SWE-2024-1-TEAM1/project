import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controller/MovieController';
import { MovieService } from './service/MovieService';
import { MovieRepository } from './repository/MovieRepository';
import { Movie } from './entity/Movie';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
})
export class MovieModule {}