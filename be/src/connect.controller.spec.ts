import { Test, TestingModule } from '@nestjs/testing';
import { ConnectController } from './connect.controller';
import { ConnectService } from './connect.service';

describe('AppController', () => {
  let appController: ConnectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConnectController],
      providers: [ConnectService],
    }).compile();

    appController = app.get<ConnectController>(ConnectController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
