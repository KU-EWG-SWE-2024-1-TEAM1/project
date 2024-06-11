import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionRepository } from '../repository/ConnectionRepository';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(ConnectionRepository)
    private readonly connectionRepository: ConnectionRepository,
  ) {}

  async getConnections(): Promise<{ today: number; total: number }> {
    const today = this.getCurrentDate();
    const connection = await this.connectionRepository.findOrCreateToday(today);

    connection.today += 1;
    connection.total += 1;
    await this.connectionRepository.save(connection);

    return {
      today: connection.today,
      total: connection.total,
    };
  }

  async getDailyConnections(date: string): Promise<{ date: string; today: number; total: number }> {
    const connection = await this.connectionRepository.findByDate(date);
    if (!connection) {
      return { date, today: 0, total: 0 };
    }
    return connection;
  }

  async getConnectionStatistics(): Promise<{ date: string, today: number, total: number }[]> {
    return this.connectionRepository.findAllOrderByDate();
  }

  private getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }
}
