import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  releaseDate: Date;

  @Column({ default: 0 })
  totalScore: number;

  @Column({ default: 0 })
  ratingCount: number;

  @Column({ default: 0 })
  searchCount: number;
  // @OneToMany(() => Rating, rating => rating.movie)
  // ratings: Rating[];
}