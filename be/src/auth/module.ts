import { Module } from '@nestjs/common';
import { AuthController} from "./controller/AuthController";
import { UserModule } from "../modules/user/module";
import { AuthService } from "./service/AuthService";

@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
