import { Test, TestingModule } from '@nestjs/testing';
import { ConnectController } from './modules/connection/controller/ConnectionController';
import { ConnectionService } from './modules/connection/service/ConnectionService';

describe('AppController', () => {
  let appController: ConnectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConnectController],
      providers: [ConnectionService],
    }).compile();

    appController = app.get<ConnectController>(ConnectController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
