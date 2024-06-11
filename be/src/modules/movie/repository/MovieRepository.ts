import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Movie } from "../entity/Movie";

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(private dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }
  async findById(id: number): Promise<Movie | undefined> {
    return this.findOne({ where: { id } });
  }

  async findByTitleContaining(title: string): Promise<Movie[]> {
    return this.createQueryBuilder('movie')
      .where('movie.title LIKE :title', { title: `%${title}%` })
      .getMany();
  }
}
