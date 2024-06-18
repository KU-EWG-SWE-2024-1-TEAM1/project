import { Controller, Get, Param } from '@nestjs/common';
import { ConnectionService } from '../service/ConnectionService';

@Controller('api')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}
  @Get('/health')
  getHealthCheck(): string {
    return '';
  }
  @Get()
  async getConnections(): Promise<{ today: number; total: number }> {
    return this.connectionService.getConnections();
  }

  @Get('/date/:date')
  async getDailyConnections(@Param('date') date: string): Promise<{ date: string; today: number; total: number }> {
    return this.connectionService.getDailyConnections(date);
  }

  @Get('statistics/all')
  async getConnectionStatistics(): Promise<{ date: string; today: number; total: number }[]> {
    return this.connectionService.getConnectionStatistics();
  }
}
