import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectService {
  getHello(): string {
    return 'Connected successfully!';
  }
}
