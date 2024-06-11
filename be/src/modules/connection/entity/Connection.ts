import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ default: 0 })
  today: number;

  @Column({ default: 0 })
  total: number;
}