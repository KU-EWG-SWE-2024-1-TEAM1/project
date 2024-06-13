import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../modules/user/service/UserService";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "../dto/LoginDto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if(!user) throw new NotFoundException('User with email not found')
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    return {
      message: 'Login successful',
      user,
    };
  }
}