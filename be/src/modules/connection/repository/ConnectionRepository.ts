import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Connection } from '../entity/Connection';

@Injectable()
export class ConnectionRepository extends Repository<Connection> {
  constructor(private dataSource: DataSource) {
    super(Connection, dataSource.createEntityManager());
  }

  async findOrCreateToday(date: string): Promise<Connection> {
    let connection = await this.findOne({ where: { date } });

    if (!connection) {
      const previousConnection = await this.find({
        order: { date: 'DESC' },
        take: 1,
      });
      const previousTotal = previousConnection.length > 0 ? previousConnection[0].total : 0;

      connection = this.create({ date, today: 0, total: previousTotal });
    }

    return connection;
  }

  async findByDate(date: string): Promise<Connection | undefined> {
    return this.findOne({ where: { date } });
  }

  async findAllOrderByDate(): Promise<Connection[]> {
    return this.find({
      select: ['date', 'today', 'total'],
      order: { date: 'ASC' },
    });
  }
}